import * as XLSX from 'xlsx';
import { Question, Difficulty, Category, QuestionType } from '../types/game';

export interface ParseResult {
  questions: Question[];
  errors: ParseError[];
  warnings: string[];
  totalRows: number;
}

export interface ParseError {
  row: number;
  column: string;
  message: string;
}

const DIFFICULTY_MAP: Record<string, Difficulty> = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

function normalizeHeader(header: string): string {
  return header.trim().toLowerCase().replace(/\s+/g, ' ');
}

function mapCorrectAnswer(value: string, optionCount: number): number | null {
  const v = value.trim().toUpperCase();
  const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
  if (letterMap[v] !== undefined && letterMap[v] < optionCount) return letterMap[v];

  const num = parseInt(v, 10);
  if (!isNaN(num) && num >= 1 && num <= optionCount) return num - 1;

  return null;
}

function inferQuestionType(options: string[]): QuestionType {
  if (options.length === 2) {
    const normalized = options.map(o => o.toLowerCase().trim());
    if (
      (normalized[0] === 'true' && normalized[1] === 'false') ||
      (normalized[0] === 'false' && normalized[1] === 'true')
    ) {
      return 'true-false';
    }
  }
  return 'multiple-choice';
}

function inferCategory(question: string): Category {
  const q = question.toLowerCase();
  if (q.includes('ocean') || q.includes('sea') || q.includes('marine')) return 'Oceans';
  if (q.includes('continent')) return 'Continents';
  if (q.includes('country') || q.includes('capital')) return 'Countries & Continents';
  return 'World Geography';
}

export function parseExcelFile(file: File): Promise<ParseResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, {
          defval: '',
        });

        if (jsonData.length === 0) {
          resolve({
            questions: [],
            errors: [{ row: 0, column: '', message: 'Excel sheet is empty or has no data rows.' }],
            warnings: [],
            totalRows: 0,
          });
          return;
        }

        // Normalize headers
        const rawHeaders = Object.keys(jsonData[0]);
        const headerMap: Record<string, string> = {};
        for (const h of rawHeaders) {
          const norm = normalizeHeader(h);
          if (norm.includes('question') && !norm.includes('option')) headerMap['question'] = h;
          else if (norm.includes('option') && norm.includes('a')) headerMap['optionA'] = h;
          else if (norm.includes('option') && norm.includes('b')) headerMap['optionB'] = h;
          else if (norm.includes('option') && norm.includes('c')) headerMap['optionC'] = h;
          else if (norm.includes('option') && norm.includes('d')) headerMap['optionD'] = h;
          else if (norm.includes('correct')) headerMap['correctAnswer'] = h;
          else if (norm.includes('difficulty') || norm.includes('level')) headerMap['difficulty'] = h;
          else if (norm.includes('category') || norm.includes('topic')) headerMap['category'] = h;
          else if (norm.includes('explanation') || norm.includes('hint')) headerMap['explanation'] = h;
        }

        const errors: ParseError[] = [];
        const warnings: string[] = [];

        if (!headerMap['question']) {
          errors.push({ row: 0, column: 'Question', message: 'Missing "Question" column header.' });
        }
        if (!headerMap['optionA']) {
          errors.push({ row: 0, column: 'Option A', message: 'Missing "Option A" column header.' });
        }
        if (!headerMap['optionB']) {
          errors.push({ row: 0, column: 'Option B', message: 'Missing "Option B" column header.' });
        }
        if (!headerMap['correctAnswer']) {
          errors.push({ row: 0, column: 'Correct Answer', message: 'Missing "Correct Answer" column header.' });
        }

        if (errors.length > 0) {
          resolve({ questions: [], errors, warnings, totalRows: jsonData.length });
          return;
        }

        const questions: Question[] = [];

        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i];
          const rowNum = i + 2;

          const questionText = String(row[headerMap['question']] || '').trim();
          if (!questionText) {
            errors.push({ row: rowNum, column: 'Question', message: 'Question text is empty.' });
            continue;
          }

          const optA = String(row[headerMap['optionA']] || '').trim();
          const optB = String(row[headerMap['optionB']] || '').trim();
          const optC = headerMap['optionC'] ? String(row[headerMap['optionC']] || '').trim() : '';
          const optD = headerMap['optionD'] ? String(row[headerMap['optionD']] || '').trim() : '';

          if (!optA || !optB) {
            errors.push({ row: rowNum, column: 'Options', message: 'At least Option A and Option B are required.' });
            continue;
          }

          const options = [optA, optB];
          if (optC) options.push(optC);
          if (optD) options.push(optD);

          const correctRaw = String(row[headerMap['correctAnswer']] || '').trim();
          const correctAnswer = mapCorrectAnswer(correctRaw, options.length);

          if (correctAnswer === null) {
            errors.push({
              row: rowNum,
              column: 'Correct Answer',
              message: `Invalid correct answer "${correctRaw}". Use A/B/C/D or 1/2/3/4.`,
            });
            continue;
          }

          const difficultyRaw = headerMap['difficulty']
            ? String(row[headerMap['difficulty']] || '').trim().toLowerCase()
            : '';
          const difficulty: Difficulty = DIFFICULTY_MAP[difficultyRaw] || 'medium';

          if (difficultyRaw && !DIFFICULTY_MAP[difficultyRaw]) {
            warnings.push(`Row ${rowNum}: Unknown difficulty "${difficultyRaw}", defaulting to "medium".`);
          }

          const categoryRaw = headerMap['category']
            ? String(row[headerMap['category']] || '').trim()
            : '';
          const category = (categoryRaw as Category) || inferCategory(questionText);

          const explanation = headerMap['explanation']
            ? String(row[headerMap['explanation']] || '').trim()
            : '';

          const type = inferQuestionType(options);

          questions.push({
            id: `custom-${i + 1}`,
            question: questionText,
            options,
            correctAnswer,
            difficulty,
            category,
            explanation: explanation || `The correct answer is: ${options[correctAnswer]}`,
            type,
          });
        }

        resolve({
          questions,
          errors,
          warnings,
          totalRows: jsonData.length,
        });
      } catch (err) {
        reject(new Error(`Failed to parse Excel file: ${(err as Error).message}`));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsArrayBuffer(file);
  });
}

export function generateTemplateExcel(): void {
  const templateData = [
    {
      'Question': 'Which is the largest ocean on Earth?',
      'Option A': 'Pacific Ocean',
      'Option B': 'Atlantic Ocean',
      'Option C': 'Indian Ocean',
      'Option D': 'Arctic Ocean',
      'Correct Answer': 'A',
      'Difficulty': 'easy',
      'Category': 'Oceans',
      'Explanation': 'The Pacific Ocean covers over 30% of Earth\'s surface.',
    },
    {
      'Question': 'True or False: Africa is the largest continent.',
      'Option A': 'True',
      'Option B': 'False',
      'Option C': '',
      'Option D': '',
      'Correct Answer': 'B',
      'Difficulty': 'easy',
      'Category': 'Continents',
      'Explanation': 'Asia is the largest continent, not Africa.',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateData);
  worksheet['!cols'] = [
    { wch: 45 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
    { wch: 20 }, { wch: 15 }, { wch: 12 }, { wch: 15 }, { wch: 50 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');
  XLSX.writeFile(workbook, 'question_template.xlsx');
}

export function parseJsonQuestions(jsonContent: string): ParseResult {
  try {
    const raw = JSON.parse(jsonContent);
    const rawArray = Array.isArray(raw)
      ? raw
      : (raw && Array.isArray(raw.questions) ? raw.questions : null);

    if (!rawArray || rawArray.length === 0) {
      return {
        questions: [],
        errors: [{ row: 0, column: '', message: 'JSON file must contain an array of question objects.' }],
        warnings: [],
        totalRows: 0,
      };
    }

    const questions: Question[] = [];
    const errors: ParseError[] = [];
    const warnings: string[] = [];

    rawArray.forEach((item: any, index: number) => {
      const rowNum = index + 1;
      if (!item || typeof item !== 'object') {
        errors.push({ row: rowNum, column: '', message: 'Item is not a valid question object.' });
        return;
      }

      const qText = typeof item.question === 'string' ? item.question.trim() : '';
      if (!qText) {
        errors.push({ row: rowNum, column: 'question', message: 'Missing question text.' });
        return;
      }

      let options: string[] = [];
      if (Array.isArray(item.options)) {
        options = item.options.map((opt: any) => String(opt).trim()).filter(Boolean);
      } else if (item.optionA && item.optionB) {
        options = [item.optionA, item.optionB, item.optionC, item.optionD]
          .filter(Boolean)
          .map((opt: any) => String(opt).trim());
      }

      if (options.length < 2) {
        errors.push({ row: rowNum, column: 'options', message: `Need at least 2 options, found ${options.length}.` });
        return;
      }

      let correctAnswerIndex: number | null = null;
      if (typeof item.correctAnswer === 'number' && item.correctAnswer >= 0 && item.correctAnswer < options.length) {
        correctAnswerIndex = item.correctAnswer;
      } else if (typeof item.correctAnswer === 'string') {
        correctAnswerIndex = mapCorrectAnswer(item.correctAnswer, options.length);
      }

      if (correctAnswerIndex === null) {
        errors.push({
          row: rowNum,
          column: 'correctAnswer',
          message: `Invalid correct answer "${item.correctAnswer}". Must be 0-${options.length - 1} or A-${String.fromCharCode(65 + options.length - 1)}.`,
        });
        return;
      }

      const diff = (typeof item.difficulty === 'string' ? item.difficulty.toLowerCase().trim() : 'medium') as Difficulty;
      const validDiff: Difficulty = (diff === 'easy' || diff === 'medium' || diff === 'hard') ? diff : 'medium';
      const cat = (typeof item.category === 'string' && item.category.trim()) ? item.category.trim() as Category : inferCategory(qText);

      questions.push({
        id: item.id || `custom-q-${Date.now()}-${index}`,
        question: qText,
        options,
        correctAnswer: correctAnswerIndex,
        difficulty: validDiff,
        category: cat,
        explanation: typeof item.explanation === 'string' ? item.explanation.trim() : '',
        type: item.type || inferQuestionType(options),
      });
    });

    return {
      questions,
      errors,
      warnings,
      totalRows: rawArray.length,
    };
  } catch (err) {
    return {
      questions: [],
      errors: [{ row: 0, column: '', message: `Invalid JSON syntax: ${(err as Error).message}` }],
      warnings: [],
      totalRows: 0,
    };
  }
}

export async function parseQuestionsFile(file: File): Promise<ParseResult> {
  const isJson = file.name.toLowerCase().endsWith('.json') || file.type === 'application/json';
  if (isJson) {
    const text = await file.text();
    return parseJsonQuestions(text);
  }
  return parseExcelFile(file);
}

export function generateTemplateJson(): void {
  const templateQuestions = [
    {
      id: 'template-01',
      question: 'Which is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
      correctAnswer: 0,
      difficulty: 'easy',
      category: 'Oceans',
      explanation: 'The Pacific Ocean covers over 30% of Earth\'s surface.',
      type: 'multiple-choice'
    },
    {
      id: 'template-02',
      question: 'True or False: Africa is the largest continent.',
      options: ['True', 'False'],
      correctAnswer: 1,
      difficulty: 'easy',
      category: 'Continents',
      explanation: 'Asia is the largest continent, not Africa.',
      type: 'true-false'
    }
  ];
  const blob = new Blob([JSON.stringify(templateQuestions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'question_template.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


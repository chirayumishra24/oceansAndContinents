import { Question, QuestionSet } from '../types/game';
import {
  getQuestionSetByCode,
  saveQuestionSet,
  deleteQuestionSet,
  getCloudQuestions,
} from '../services/firebaseQuestions';

const STORAGE_KEY = 'ocean-racers-custom-questions';
const ACTIVE_CODE_KEY = 'ocean-racers-active-code';
const TEACHER_CODES_KEY = 'ocean-racers-teacher-codes';

// ─── Active Game Code ──────────────────────────────────────────────

export function saveActiveGameCode(code: string): void {
  try {
    localStorage.setItem(ACTIVE_CODE_KEY, code);
  } catch (e) {
    console.error('Failed to save active game code:', e);
  }
}

export function loadActiveGameCode(): string | null {
  try {
    return localStorage.getItem(ACTIVE_CODE_KEY);
  } catch (e) {
    return null;
  }
}

export function clearActiveGameCode(): void {
  localStorage.removeItem(ACTIVE_CODE_KEY);
}

// ─── Teacher's Created Codes (for "My Question Sets") ──────────────

export interface TeacherCodeEntry {
  code: string;
  createdAt: number;
  teamACount: number;
  teamBCount: number;
}

export function saveTeacherCode(entry: TeacherCodeEntry): void {
  try {
    const existing = loadTeacherCodes();
    const updated = [entry, ...existing.filter(e => e.code !== entry.code)].slice(0, 20);
    localStorage.setItem(TEACHER_CODES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save teacher code:', e);
  }
}

export function loadTeacherCodes(): TeacherCodeEntry[] {
  try {
    const data = localStorage.getItem(TEACHER_CODES_KEY);
    if (!data) return [];
    return JSON.parse(data) as TeacherCodeEntry[];
  } catch (e) {
    return [];
  }
}

export function removeTeacherCode(code: string): void {
  try {
    const existing = loadTeacherCodes();
    localStorage.setItem(TEACHER_CODES_KEY, JSON.stringify(existing.filter(e => e.code !== code)));
  } catch (e) {
    console.error('Failed to remove teacher code:', e);
  }
}

// ─── Code-Based Question Loading ───────────────────────────────────

export async function loadQuestionSetByCode(code: string): Promise<QuestionSet | null> {
  try {
    const qs = await getQuestionSetByCode(code);
    if (qs) {
      // Cache locally
      try {
        localStorage.setItem(`ocean-racers-qs-${code}`, JSON.stringify(qs));
      } catch {}
    }
    return qs;
  } catch (err) {
    // Try local cache
    try {
      const cached = localStorage.getItem(`ocean-racers-qs-${code}`);
      if (cached) return JSON.parse(cached) as QuestionSet;
    } catch {}
    return null;
  }
}

// ─── Save Question Set (Teacher Upload) ────────────────────────────

export async function saveQuestionSetToCloud(
  teamAQuestions: Question[],
  teamBQuestions: Question[]
): Promise<string> {
  const code = await saveQuestionSet(teamAQuestions, teamBQuestions);
  
  // Track in teacher's local list
  saveTeacherCode({
    code,
    createdAt: Date.now(),
    teamACount: teamAQuestions.length,
    teamBCount: teamBQuestions.length,
  });

  return code;
}

export async function deleteQuestionSetByCode(code: string): Promise<void> {
  await deleteQuestionSet(code);
  removeTeacherCode(code);
  try {
    localStorage.removeItem(`ocean-racers-qs-${code}`);
  } catch {}
}

// ─── Legacy Compat ─────────────────────────────────────────────────

export function saveCustomQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Failed to save custom questions to localStorage:', e);
  }
}

export function loadCustomQuestions(): Question[] | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const parsed = JSON.parse(data) as Question[];
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed;
  } catch (e) {
    return null;
  }
}

export function clearCustomQuestions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export async function syncQuestionsFromCloud(): Promise<Question[] | null> {
  try {
    const cloud = await getCloudQuestions();
    if (cloud && cloud.length > 0) {
      saveCustomQuestions(cloud);
      return cloud;
    }
  } catch (err) {
    console.warn('Cloud questions sync failed:', err);
  }
  return loadCustomQuestions();
}

export function exportQuestionsToJson(questions: Question[], filename = 'questions.json'): void {
  try {
    const jsonStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Failed to export questions to JSON:', e);
  }
}

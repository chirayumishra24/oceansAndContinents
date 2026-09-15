import { Question } from '../types/game';
import { 
  getCloudQuestions, 
  saveCloudQuestions, 
  clearCloudQuestions 
} from '../services/firebaseQuestions';

const STORAGE_KEY = 'ocean-racers-custom-questions';

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
    console.error('Failed to load custom questions from localStorage:', e);
    return null;
  }
}

export function clearCustomQuestions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasCustomQuestions(): boolean {
  return loadCustomQuestions() !== null;
}

export async function syncQuestionsFromCloud(): Promise<Question[] | null> {
  try {
    const cloud = await getCloudQuestions();
    if (cloud && cloud.length > 0) {
      saveCustomQuestions(cloud);
      return cloud;
    }
  } catch (err) {
    console.warn('Cloud questions sync failed, using local cache:', err);
  }
  return loadCustomQuestions();
}

export async function saveCustomQuestionsToCloud(questions: Question[]): Promise<void> {
  saveCustomQuestions(questions);
  try {
    await saveCloudQuestions(questions);
  } catch (err) {
    console.error('Failed to save questions to cloud:', err);
    throw err;
  }
}

export async function clearCustomQuestionsFromCloud(): Promise<void> {
  clearCustomQuestions();
  try {
    await clearCloudQuestions();
  } catch (err) {
    console.error('Failed to clear questions from cloud:', err);
    throw err;
  }
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

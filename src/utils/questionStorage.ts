import { Question } from '../types/game';

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

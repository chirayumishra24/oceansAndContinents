import { doc, getDoc, setDoc, deleteDoc, onSnapshot, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, QuestionSet } from '../types/game';

// ─── Code Generation ───────────────────────────────────────────────

function randomCode(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

/**
 * Generate a unique 4-digit game code, checking Firestore for collisions.
 */
async function generateUniqueCode(maxRetries = 10): Promise<string> {
  for (let i = 0; i < maxRetries; i++) {
    const code = randomCode();
    const ref = doc(db, 'games', code);
    const snap = await getDoc(ref);
    if (!snap.exists()) return code;
  }
  // Extremely unlikely fallback — use timestamp suffix
  return String(Math.floor(1000 + Math.random() * 9000)) + String(Date.now()).slice(-2);
}

// ─── CRUD Operations ───────────────────────────────────────────────

/**
 * Save a question set to Firestore under a unique 4-digit code.
 * Returns the generated code.
 */
export async function saveQuestionSet(
  teamAQuestions: Question[],
  teamBQuestions: Question[]
): Promise<string> {
  const code = await generateUniqueCode();
  const payload: QuestionSet = {
    code,
    teamAQuestions,
    teamBQuestions,
    createdAt: Date.now(),
    createdBy: 'Teacher Dashboard',
    totalQuestions: teamAQuestions.length + teamBQuestions.length,
  };
  await setDoc(doc(db, 'games', code), payload);
  return code;
}

/**
 * Fetch a question set by its 4-digit code.
 */
export async function getQuestionSetByCode(code: string): Promise<QuestionSet | null> {
  try {
    const ref = doc(db, 'games', code);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data() as QuestionSet;
    if (!data.teamAQuestions && !data.teamBQuestions) {
      // Legacy format migration — old single-array doc
      const legacy = data as any;
      if (Array.isArray(legacy.questions) && legacy.questions.length > 0) {
        return {
          code,
          teamAQuestions: legacy.questions,
          teamBQuestions: legacy.questions,
          createdAt: legacy.updatedAt || Date.now(),
          createdBy: legacy.updatedBy,
          totalQuestions: legacy.questions.length * 2,
        };
      }
      return null;
    }
    return data;
  } catch (error) {
    console.warn('Failed to fetch question set:', error);
    return null;
  }
}

/**
 * Real-time listener for a specific game code.
 */
export function subscribeToQuestionSet(
  code: string,
  callback: (qs: QuestionSet | null) => void
): () => void {
  const ref = doc(db, 'games', code);
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as QuestionSet;
        if (data.teamAQuestions || data.teamBQuestions) {
          callback(data);
          return;
        }
      }
      callback(null);
    },
    (err) => {
      console.warn('Firestore subscription error:', err);
      callback(null);
    }
  );
}

/**
 * Delete a question set by code.
 */
export async function deleteQuestionSet(code: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'games', code));
  } catch (error) {
    console.warn('Failed to delete question set:', error);
  }
}

// ─── Legacy Compatibility ──────────────────────────────────────────
// Keep old functions working during migration

const LEGACY_DOC_REF = doc(db, 'games', 'ocean-racers');

export interface CloudQuestionsPayload {
  questions: Question[];
  updatedAt: number;
  totalQuestions: number;
  updatedBy?: string;
}

export async function getCloudQuestions(): Promise<Question[] | null> {
  try {
    const snap = await getDoc(LEGACY_DOC_REF);
    if (!snap.exists()) return null;
    const data = snap.data() as CloudQuestionsPayload;
    if (Array.isArray(data.questions) && data.questions.length > 0) {
      return data.questions;
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch legacy questions:', error);
    return null;
  }
}

export function subscribeToCloudQuestions(
  callback: (questions: Question[] | null, updatedAt?: number) => void
): () => void {
  return onSnapshot(
    LEGACY_DOC_REF,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as CloudQuestionsPayload;
        if (Array.isArray(data.questions) && data.questions.length > 0) {
          callback(data.questions, data.updatedAt);
          return;
        }
      }
      callback(null);
    },
    (err) => {
      console.warn('Firestore live subscription error:', err);
      callback(null);
    }
  );
}

import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question } from '../types/game';

const GAME_DOC_REF = doc(db, 'games', 'ocean-racers');

export interface CloudQuestionsPayload {
  questions: Question[];
  updatedAt: number;
  totalQuestions: number;
  updatedBy?: string;
}

/**
 * Fetch active questions from Firebase Firestore
 */
export async function getCloudQuestions(): Promise<Question[] | null> {
  try {
    const snap = await getDoc(GAME_DOC_REF);
    if (!snap.exists()) return null;
    const data = snap.data() as CloudQuestionsPayload;
    if (Array.isArray(data.questions) && data.questions.length > 0) {
      return data.questions;
    }
    return null;
  } catch (error) {
    console.warn('Failed to fetch questions from Firebase Firestore:', error);
    return null;
  }
}

/**
 * Save questions to Firebase Firestore so all devices can sync
 */
export async function saveCloudQuestions(questions: Question[]): Promise<void> {
  const payload: CloudQuestionsPayload = {
    questions,
    updatedAt: Date.now(),
    totalQuestions: questions.length,
    updatedBy: 'Teacher Dashboard',
  };
  await setDoc(GAME_DOC_REF, payload);
}

/**
 * Reset cloud questions back to default
 */
export async function clearCloudQuestions(): Promise<void> {
  try {
    await deleteDoc(GAME_DOC_REF);
  } catch (error) {
    console.warn('Failed to clear questions from Firebase Firestore:', error);
  }
}

/**
 * Real-time listener for cross-device live updates
 */
export function subscribeToCloudQuestions(
  callback: (questions: Question[] | null, updatedAt?: number) => void
): () => void {
  return onSnapshot(
    GAME_DOC_REF,
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

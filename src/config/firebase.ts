import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDLcXwju50fe7hf6LvYtTmuRklr6-L8urs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'skill-assessment-test-307a7.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'skill-assessment-test-307a7',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'skill-assessment-test-307a7.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '844252065446',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:844252065446:web:f0746f38f76ca886068e67',
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db: Firestore = getFirestore(app);

export default app;

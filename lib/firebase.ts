// lib/firebase.ts
// ⚠️ Replace with your actual Firebase config after running `firebase init`
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY            ?? "REPLACE_ME",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? "REPLACE_ME",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID         ?? "REPLACE_ME",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? "REPLACE_ME",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "REPLACE_ME",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID             ?? "REPLACE_ME",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

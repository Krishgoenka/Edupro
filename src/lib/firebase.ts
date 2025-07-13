
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// IMPORTANT: The following variables are read from your .env file.
// Make sure you have a .env file with the correct values for your Firebase project.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate that all Firebase config keys are present. This will guide the user
// if they have not set up their .env file correctly.
if (!firebaseConfig.apiKey) {
    throw new Error("CRITICAL: Missing Firebase API Key. For local development, set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file. For Vercel deployment, add it to your project's Environment Variables in the Vercel dashboard and redeploy.");
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, functions, googleProvider };

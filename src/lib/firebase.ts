import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace this with your own Firebase project's configuration
// from the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyC8Z3pPe5LE8eMEg15CmfeI1m7qOpaBs0U",
  authDomain: "edupro-5q9xx.firebaseapp.com",
  projectId: "edupro-5q9xx",
  storageBucket: "edupro-5q9xx.firebasestorage.app",
  messagingSenderId: "1055644959527",
  appId: "1:1055644959527:web:f67fc78884c99ea7375f02"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };





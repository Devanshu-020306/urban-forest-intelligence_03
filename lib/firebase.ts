import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIgTAhgSc-UdwSdsbhzBElOchacVTJMp4",
  authDomain: "urban-forest-tracker.firebaseapp.com",
  projectId: "urban-forest-tracker",
  storageBucket: "urban-forest-tracker.firebasestorage.app",
  messagingSenderId: "815897853895",
  appId: "1:815897853895:web:7fded24e59f43395e7e3e2",
  measurementId: "G-PE3XWCNFHX"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, db, storage, analytics };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkgLDRfXOw1uSCJ2fKSdJXwPJaBaLuRw",
  authDomain: "stashr-3971c.firebaseapp.com", 
  projectId: "stashr-3971c",
  storageBucket: "stashr-3971c.firebasestorage.app",
  messagingSenderId: "978597000936",
  appId: "1:978597000936:web:eedc7234d780c1a2ac4895"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth (Firebase handles persistence automatically in Expo/React Native)
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
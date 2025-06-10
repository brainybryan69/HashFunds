import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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

    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });

// Initialize Firestore
export const db = getFirestore(app);

export default app;
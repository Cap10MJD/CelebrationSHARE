import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
// Replace these values with your actual Firebase config from the Firebase Console
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "celebrationshare.firebaseapp.com",
  projectId: "celebrationshare",
  storageBucket: "celebrationshare.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; 
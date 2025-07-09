import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSNDN7q1JfranCWSVRgOmsblwIDR8yl-g",
  authDomain: "celebrationshare.firebaseapp.com",
  projectId: "celebrationshare",
  storageBucket: "celebrationshare.firebasestorage.app",
  messagingSenderId: "934971178625",
  appId: "1:934971178625:web:3d2627b27fd8ea81655780"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app; 
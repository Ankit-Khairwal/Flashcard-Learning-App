// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhjouyMO8B4vFBtS40urEyYH5QMvipiZ0",
  authDomain: "flash-7eeee.firebaseapp.com",
  projectId: "flash-7eeee",
  storageBucket: "flash-7eeee.firebasestorage.app",
  messagingSenderId: "274797400724",
  appId: "1:274797400724:web:cab6068fb90e3e67e25a81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

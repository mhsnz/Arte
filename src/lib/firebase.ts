// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
     import { getAuth } from 'firebase/auth';
     import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZWpSizhQP3PJoKR9QamepHdXPk8d5ddc",
  authDomain: "londeville-bc0c4.firebaseapp.com",
  projectId: "londeville-bc0c4",
  storageBucket: "londeville-bc0c4.firebasestorage.app",
  messagingSenderId: "10775104536",
  appId: "1:10775104536:web:bfc34aa829f30ceecd476d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
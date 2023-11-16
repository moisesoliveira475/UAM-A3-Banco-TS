// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCHDEOk2DVhRSvIDhzixYgpoI2TwtZTH7w",
  authDomain: "uam-bank.firebaseapp.com",
  projectId: "uam-bank",
  storageBucket: "uam-bank.appspot.com",
  messagingSenderId: "115609490832",
  appId: "1:115609490832:web:2e74c4e43c41be667ecf15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
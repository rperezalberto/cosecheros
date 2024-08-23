// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUCHwC4E-_cNC_2kgvosZyocxdo0qBrkY",
  authDomain: "cosecheros-e0eed.firebaseapp.com",
  projectId: "cosecheros-e0eed",
  storageBucket: "cosecheros-e0eed.appspot.com",
  messagingSenderId: "541917587742",
  appId: "1:541917587742:web:339d42fddfbc22657c410f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

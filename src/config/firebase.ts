// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMcy3CcqM6fkRcKPWUsEqOIyYjm36qDIs",
  authDomain: "qr-attendance-51e54.firebaseapp.com",
  projectId: "qr-attendance-51e54",
  storageBucket: "qr-attendance-51e54.firebasestorage.app",
  messagingSenderId: "191640882587",
  appId: "1:191640882587:web:0962a39cb1766e3782253e",
  measurementId: "G-HTD8YG60NR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAD9v8llaFqLkyN-otYykcd6_9VI0eqRo",
  authDomain: "live-voting-list.firebaseapp.com",
  projectId: "live-voting-list",
  storageBucket: "live-voting-list.firebasestorage.app",
  messagingSenderId: "60879232184",
  appId: "1:60879232184:web:e2cc6eb57b5dd7eb3e284d",
  measurementId: "G-EK9JY48HNB",
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default db;

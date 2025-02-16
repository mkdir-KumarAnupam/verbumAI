// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJmiNoz9jFEdvDf-0OgGK629Uec9UxVFs",
  authDomain: "lingomaster-d400b.firebaseapp.com",
  projectId: "lingomaster-d400b",
  storageBucket: "lingomaster-d400b.firebasestorage.app",
  messagingSenderId: "121810979351",
  appId: "1:121810979351:web:cc4bcc607294ebd07d6a52",
  measurementId: "G-MM80117H71"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
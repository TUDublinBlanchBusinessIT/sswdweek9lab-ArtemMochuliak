// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  
  "projectId": "maweek8lab-artem",
  "appId": "1:102479715947:web:6c8849cc475407a2e51b2e",
  "storageBucket": "maweek8lab-artem.firebasestorage.app",
  "apiKey": "AIzaSyBORFJJYJF_HNRj43Xp3txxCrEi8SIF8yc",
  "authDomain": "maweek8lab-artem.firebaseapp.com",
  "messagingSenderId": "102479715947",
  "projectNumber": "102479715947",
  "version": "2"

  // Your Firebase configuration object goes here
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 

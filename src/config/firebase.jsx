import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVOOnhjSD06OvL0DU598Fepz-xXk_xCfc",
  authDomain: "myapp-64631.firebaseapp.com",
  projectId: "myapp-64631",
  storageBucket: "myapp-64631.appspot.com",
  messagingSenderId: "99496618729",
  appId: "1:99496618729:web:ace7f5dd9eea74220d1e78",
  measurementId: "G-8KWMF38YXT"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
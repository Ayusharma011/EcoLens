import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD0GFczIuKxsxLHSVtPVr3kcka-vuHIAE",
  authDomain: "ecolens-9c85f.firebaseapp.com",
  projectId: "ecolens-9c85f",
  storageBucket: "ecolens-9c85f.firebasestorage.app",
  messagingSenderId: "599932397926",
  appId: "1:599932397926:web:4db918d3966bbbf88080a7",
  measurementId: "G-FK0H1CVZCZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

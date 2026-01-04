import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, signInAnonymously, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDD0GFczIuKxsxLHSVtPVr3kcka-vuHIAE",
  authDomain: "ecolens-9c85f.firebaseapp.com",
  projectId: "ecolens-9c85f",
  storageBucket: "ecolens-9c85f.firebasestorage.app",
  messagingSenderId: "599932397926",
  appId: "1:599932397926:web:4db918d3966bbbf88080a7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app, "us-central1");

if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(db, "127.0.0.1", 8081);
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously (EMULATOR)"))
  .catch(console.error);

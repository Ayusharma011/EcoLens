
import './App.css'
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
  const unsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log("Auth ready:", currentUser?.uid);
  });

  return () => unsub();
  }, []);

  const testScan = async () => {
  if (!user) {
    alert("User not logged in yet");
    return;
  }

  try {
    const createScan = httpsCallable(functions, "createScan");

    const result = await createScan({
      imageUrl: "https://example.com/garbage.jpg"
    });

    console.log("Scan result:", result.data);
  } catch (err) {
    console.error("Scan failed:", err);
  }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-green-600 underline">
        EcoLens is Running!
      </h1>
      <button onClick={testScan} disabled={!user}>
      Test Scan
      </button>
    </>
  )
}

async function testSignup() {
  const res = await createUserWithEmailAndPassword(
    auth,
    "testuser@gmail.com",
    "password123"
  );

  await setDoc(doc(db, "users", res.user.uid), {
    name: "Test User",
    email: res.user.email,
    role: "user",
    createdAt: serverTimestamp()
  });

  console.log("User created in Firestore");
}

//testSignup();
export default App

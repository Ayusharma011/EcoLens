
import './App.css'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold text-green-600 underline">
        EcoLens is Running!
      </h1>
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

testSignup();
export default App

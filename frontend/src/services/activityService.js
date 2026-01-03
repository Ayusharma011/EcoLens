import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../firebase";

export const createActivity = async (type, value) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, "activities"), {
    userId: user.uid,
    type,
    value,
    createdAt: serverTimestamp(),
  });
};

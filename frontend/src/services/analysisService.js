import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase";

export const listenToAnalysisResult = (activityId, callback) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  return onSnapshot(doc(db, "analysisResults", activityId), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
};

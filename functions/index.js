const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.createScan = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { imageUrl } = request.data;
  const uid = request.auth.uid;

  //Ai which will give here.
  const mockResult = {
    material: "Plastic",
    recyclable: true,
    instruction: "Rinse the plastic bottle and place it in dry waste."
  };

  const scanDoc = {
    userId: uid,
    imageUrl,
    ...mockResult,
    createdAt: new Date()
  };

  const userRef = db.collection("users").doc(uid);

  await userRef.set(
  {
    points: admin.firestore.FieldValue.increment(
      mockResult.recyclable ? 10 : 0
    ),
    updatedAt: new Date()
  },
  { merge: true }
  );

  await db.collection("scans").add(scanDoc);

  return scanDoc;
});


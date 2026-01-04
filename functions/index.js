const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.createScan = onCall(
  { region: "us-central1" },
  async (request) => {
    if (!request.auth) {
      throw new Error("User must be logged in");
    }

    const { imageUrl } = request.data;

    const mockResult = {
      wasteType: "Plastic",
      recyclable: true,
      aiConfidence: 0.93,
    };

    const scanRef = await db.collection("scans").add({
      uid: request.auth.uid,
      imageUrl,
      ...mockResult,
      createdAt: FieldValue.serverTimestamp(),
    });

    return {
      scanId: scanRef.id,
      ...mockResult,
    };
  }
);

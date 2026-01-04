const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { GoogleGenerativeAI } = require("@google/generative-ai");

initializeApp();
const db = getFirestore();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.createScan = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { imageBase64, imageUrl } = request.data;
  const uid = request.auth.uid;

  const oneMinuteAgo = Date.now() - 60 * 1000;

  const recentScans = await db
    .collection("scans")
    .where("userId", "==", uid)
    .where("createdAt", ">", oneMinuteAgo)
    .get();

  if (recentScans.size >= 5) {
    throw new HttpsError(
      "resource-exhausted",
      "Too many scans. Please wait."
    );
  }

  let aiResult;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Identify the waste material.
      Respond ONLY in JSON:
      {
        "material": string,
        "recyclable": boolean,
        "instruction": string
      }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]);

    aiResult = JSON.parse(result.response.text());
  } catch (error) {
    aiResult = {
      material: "Plastic",
      recyclable: true,
      instruction: "Rinse and place in dry waste"
    };
  }

  const scanDoc = {
    userId: uid,
    imageUrl: imageUrl || null,
    ...aiResult,
    createdAt: Date.now()
  };

  await db.collection("scans").add(scanDoc);

  await db.collection("users").doc(uid).set(
    {
      points: FieldValue.increment(aiResult.recyclable ? 10 : 0),
      updatedAt: Date.now()
    },
    { merge: true }
  );

  return scanDoc;
});

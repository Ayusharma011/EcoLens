const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


initializeApp();
const db = getFirestore();

exports.createScan = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const { imageUrl } = request.data;
  const uid = request.auth.uid;


  let aiResult;
  try {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
  Identify the waste material from this image.
  Respond strictly in JSON with:
  material, recyclable (true/false), instruction
  `;

  const result = await model.generateContent([
    prompt,
    { inlineData: { mimeType: "image/jpeg", data: imageBase64 } }
  ]);

  aiResult = JSON.parse(result.response.text());
} catch (err) {
  aiResult = {
    material: "Plastic",
    recyclable: true,
    instruction: "Rinse and place in dry waste"
  };
}

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


const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.onActivityCreated = functions.firestore
  .document("activities/{activityId}")
  .onCreate(async (snap, context) => {
    const activity = snap.data();
    const activityId = context.params.activityId;

    const score = Math.floor(Math.random() * 40) + 60;

    await db.collection("analysisResults").doc(activityId).set({
      activityId,
      userId: activity.userId,
      sustainabilityScore: score,
      processedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Analysis completed for", activityId);
  });

const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.region('asia-southeast1').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.checkWord = functions.region('asia-southeast1').https.onRequest((request, response) => {
  
})

exports.generateWord = functions.region('asia-southeast1').database.ref('/rooms/{roomId}')
    .onCreate((snapshot, context) => {
    // Self curated array of Fruits for debugging purposes.
        const wordArr = ["APPLE", "PEAR", "BANANA", "WATERMELON", "ORANGE", "KIWI",
                        "BLUEBERRY", "GRAPE", "PAPAYA", "LEMON", "CRANBERRY", "HONEYDEW",
                        "MANGO", "RAMBUTAN"];

        const len = wordArr.length;
        const randomWord = wordArr[Math.floor(Math.random() * len)];
        functions.logger.info(context.params);

        return snapshot.ref.parent.parent.child("words/" + context.params.roomId).set({word: randomWord});
    });

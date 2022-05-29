const functions = require("firebase-functions");
const admin = require('firebase-admin')
var serviceAccount = require("./serviceAccountKey.json");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp();
exports.helloWorld = functions.region('asia-southeast1').https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.initNewPlayer = functions.region('asia-southeast1').https.onCall((data, context) => {
  if (!admin.apps.length) {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // The database URL depends on the location of the database
      databaseURL: "https://tiktok-camp-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
  }

  var db = admin.database();
  var ref = db.ref("lives/" + data.roomId + "/");
  const dataToAdd = {
    [data.playerName] : 6
  }
  

  return ref.update(dataToAdd);

})


exports.initializePlayerState = functions.region('asia-southeast1').database.ref('/rooms/{roomId}')
  .onUpdate((change) => {
    if (!admin.apps.length) {
      const firebaseAdmin = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // The database URL depends on the location of the database
        databaseURL: "https://tiktok-camp-default-rtdb.asia-southeast1.firebasedatabase.app"
      });
    }
  
    const after = change.after
    var db = admin.database();
    var ref = db.ref("lives/" + after.key + "/");

    if(after.exists()) {
      for(let v in change.after.toJSON()) {
        console.log(v);
        if(v != "GAME_STATE") {
          ref.set({[v]: 6})
        }
      }
    }
    return ;
  })
exports.checkWord = functions.region('asia-southeast1').https.onCall((data, context) => {
  functions.logger.info("hello", {structuredData: true});

  if (!admin.apps.length) {
    const firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // The database URL depends on the location of the database
      databaseURL: "https://tiktok-camp-default-rtdb.asia-southeast1.firebasedatabase.app"
    });
  }

  var db = admin.database();
  var ref = db.ref("words/" + data.roomId);
  var result = "";
  console.log(data);
  ref.once("value", function(snapshot) {
    console.log(snapshot.val());
    let masterWord = snapshot.val().word;
    let guess = data.guess;
    const dbnamefield = data.playerName.value + "_STATE";
    console.log(data);
    if(guess == '*'){
      functions.logger.info("INITIALIZE GAME", {structuredData: true});
      for (let i = 0; i < masterWord.length; i++) {
        result += '_';
      }
      const dataToAdd = {
        [dbnamefield] : result
      }
      db.ref("state/" + data.roomId).update(dataToAdd);
      return result;
    }
    //GUESSED LETTER NOT IN MASTER WORD
    if(!masterWord.includes(guess)) {
      console.log("lose a life");
      result = data.currentWordState;
      const db = admin.database();
      const livesRef = db.ref(`lives/${data.roomId}/${data.playerName.value}`);
      livesRef.transaction((currentValue) => {
        return (currentValue) - 1;
      })
      result = "WRONG";
    }
    //GUESED LETTER IS IN MASTER WORD
    else {
      for (let i = 0; i < masterWord.length; ++i) {
        if (guess == masterWord.charAt(i)) {
            if (guess == data.currentWordState.charAt(i)) {
                console.log("Already guessed this letter!");
                return data.currentWordState;
            }
            result += guess;
        } else {
            result += data.currentWordState.charAt(i);
        }
      }
      //PLAYER HAS WON
      if(!result.includes("_")) {
        result = "WINNER!";
      }

      const dataToAdd = {
        [dbnamefield] : result
      }
      db.ref("state/" + data.roomId).update(dataToAdd);
    }
      });
      functions.logger.info("or here");
      return result;
    })

exports.generateWord = functions.region('asia-southeast1').database.ref('/rooms/{roomId}')
    .onCreate((snapshot, context) => {

      if (!admin.apps.length) {
        const firebaseAdmin = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          // The database URL depends on the location of the database
          databaseURL: "https://tiktok-camp-default-rtdb.asia-southeast1.firebasedatabase.app"
        });
      }
    // Self curated array of Fruits for debugging purposes.
        const wordArr = ["APPLE", "PEAR", "BANANA", "WATERMELON", "ORANGE", "KIWI",
                        "BLUEBERRY", "GRAPE", "PAPAYA", "LEMON", "CRANBERRY", "HONEYDEW",
                        "MANGO", "RAMBUTAN"];

        const len = wordArr.length;
        const randomWord = wordArr[Math.floor(Math.random() * len)];
        functions.logger.info(context.params);


        var db = admin.database();
        var ref = db.ref("rooms/" + context.params.roomId);
        ref.once("value", function(snapshot) {
          let noOfPlayers = Object.keys(snapshot.toJSON()).length;
          for(let x in snapshot.toJSON()) {
            functions.logger.info(x.playerName);
            // var livesRef = db.ref("lives/" + context.params.roomId + )
          }
          console.log("playerCount" + noOfPlayers)
        });

        return snapshot.ref.parent.parent.child("words/" + context.params.roomId).set({word: randomWord});
    });

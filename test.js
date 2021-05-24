var firebase = require('firebase')

var firebaseConfig = {
  apiKey: "AIzaSyDt6eb9buDMCap2GdwF7Y9TcOJaz_B6u8o",
  authDomain: "bot-discord-f0d02.firebaseapp.com",
  projectId: "bot-discord-f0d02",
  storageBucket: "bot-discord-f0d02.appspot.com",
  messagingSenderId: "845388166393",
  appId: "1:845388166393:web:ed567721531f1259d5de28",
  measurementId: "G-87QDVGX3Q2"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let database = firebase.database()
var test ="7333393221656248s82";
database.ref("users/"+test).once('value')
.then(function(snapshot,error) {

    if (error) {
        // The write failed...
        console.log("Failed with error: " + error)
      } else {
        // The write was successful...
        console.log("success")
        console.log( snapshot.val().dsgdg)
      }
    
})

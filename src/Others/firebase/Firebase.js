// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {ADMIN_EMAIL, ADMIN_PWD} from "../config";

const config = {
  /*apiKey: "AIzfhrwkKhDBFHbntnKhTahHjkNK6FG875dSB6y",
  authDomain: "typecode-76g33.firebaseapp.com",
  databaseURL: "https://typecode-76g33.firebaseio.com",
  projectId: "typecode-76g33",
  storageBucket: "",
  messagingSenderId: "547432956432"*/

  apiKey: "AIzaSyD8raHaBicHW5GQXgtOkXKnTgzqxPjSmoI",
  authDomain: "juns-memory-card.firebaseapp.com",
  databaseURL: "https://juns-memory-card.firebaseio.com",
  projectId: "juns-memory-card",
  storageBucket: "juns-memory-card.appspot.com",
  messagingSenderId: "915401114459",
  appId: "1:915401114459:web:8a6cbf2eef9a21974d907e",
  measurementId: "G-LSQ968NMMJ"
};

firebase.initializeApp(config);

firebase.auth().signInWithEmailAndPassword(ADMIN_EMAIL, ADMIN_PWD).catch(function(error) {
  // Handle Errors here.
  let errorCode = error.code;
  let errorMessage = error.message;

  console.log('================================================');
  console.log('================================================');
  console.log('errorCode = ',errorCode);
  console.log('errorMessage = ',errorMessage);
  console.log('================================================');
  console.log('================================================');
  // ...
});
/**
 * For sign out
 */
/*firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});*/

export default firebase;

/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/7.7.0/firebase-analytics.js"></script>

    <script>
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD8raHaBicHW5GQXgtOkXKnTgzqxPjSmoI",
  authDomain: "juns-memory-card.firebaseapp.com",
  databaseURL: "https://juns-memory-card.firebaseio.com",
  projectId: "juns-memory-card",
  storageBucket: "juns-memory-card.appspot.com",
  messagingSenderId: "915401114459",
  appId: "1:915401114459:web:8a6cbf2eef9a21974d907e",
  measurementId: "G-LSQ968NMMJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
</script>*/

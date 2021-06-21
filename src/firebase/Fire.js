import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDmjdqj_87s3_aOGWG9jMpOvlPjW-b7Dq8",
  authDomain: "octo-do.firebaseapp.com",
  projectId: "octo-do",
  storageBucket: "octo-do.appspot.com",
  messagingSenderId: "189370946423",
  appId: "1:189370946423:web:e5297e9b9d359adf53c772",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

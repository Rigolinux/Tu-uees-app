import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCrq1lsf-kOyiEqkGTdUa-SzLCz2T7Ab68",

  authDomain: "app-uees-app.firebaseapp.com",

  projectId: "app-uees-app",

  storageBucket: "app-uees-app.appspot.com",

  messagingSenderId: "541363763023",

  appId: "1:541363763023:web:f55c694f26344541d1773a"

};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//user authentication module for firebase
const auth = getAuth(app);

// const db = getFirestore(app);
const db = getFirestore(app);

// export default db;

//database module for firebase
module.exports = { auth, db };
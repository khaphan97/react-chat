import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
	apiKey: "AIzaSyDhcxx2XJmO73jxj5LoNxtbHJ-hX3sSA8g",
	authDomain: "chat-app-bf6f7.firebaseapp.com",
	projectId: "chat-app-bf6f7",
	storageBucket: "chat-app-bf6f7.appspot.com",
	messagingSenderId: "457034179264",
	appId: "1:457034179264:web:da19308b3ab4ff9b064325",
	measurementId: "G-SJTRLM3FDW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator("http://localhost:9099");
if (window.location.hostname === "localhost") {
	db.useEmulator("localhost", "8080");
}

export { auth, db };
export default firebase;

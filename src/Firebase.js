import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyBblE2i7Hbdjpb5UOYh-QUzWnExk-mkT-M",
  authDomain: "finaltest-53c1c.firebaseapp.com",
  projectId: "finaltest-53c1c",
  storageBucket: "finaltest-53c1c.appspot.com",
  messagingSenderId: "1046263152118",
  appId: "1:1046263152118:web:e5ccaba9892828c8d6dbd7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app); 

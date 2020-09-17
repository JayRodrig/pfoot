import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkx3T8HpkRXVncqyJyuL92yo5zhs8A6_s",
  authDomain: "pfoot-b61e0.firebaseapp.com",
  databaseURL: "https://pfoot-b61e0.firebaseio.com",
  projectId: "pfoot-b61e0",
  storageBucket: "pfoot-b61e0.appspot.com",
  messagingSenderId: "157749839868",
  appId: "1:157749839868:web:813903a14d3e68c13c1479",
  measurementId: "G-R1B3VQDV6P"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

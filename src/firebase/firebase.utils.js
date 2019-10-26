import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCDZu6dYUmeCG3UsRca5ngMlkGL-Bn6JDI",
  authDomain: "shop-clothing.firebaseapp.com",
  databaseURL: "https://shop-clothing.firebaseio.com",
  projectId: "shop-clothing",
  storageBucket: "shop-clothing.appspot.com",
  messagingSenderId: "1091729497860",
  appId: "1:1091729497860:web:de424383f2be5342543a51",
  measurementId: "G-1G2HJC06JH"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

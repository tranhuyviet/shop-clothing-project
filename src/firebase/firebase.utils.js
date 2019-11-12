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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //console.log(firestore.doc("users/dasfasdf3434sdf"));

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //const userRef = firestore.doc("users/33MGd8AmswxWrC0vxhg9");
  const snapShot = await userRef.get();

  //console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user ", error);
    }
  }
  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  //console.log(transformCollection);
  return transformCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

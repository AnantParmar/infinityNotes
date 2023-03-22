import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAgoodG8sHk4gdYdWP90egwuHF0JUYOn5c",
  authDomain: "inotebook-by-infinity.firebaseapp.com",
  projectId: "inotebook-by-infinity",
  storageBucket: "inotebook-by-infinity.appspot.com",
  messagingSenderId: "855589767426",
  appId: "1:855589767426:web:97efb67535f3f499d5da1b",
  measurementId: "G-RHBR4WE0K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
auth.languageCode = 'it';
// const noteCol = db.collection();
export {app,auth,db};
// const analytics = getAnalytics(app);
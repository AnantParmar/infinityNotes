import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCx7KuctTz8742rB0--Ps0Y_-1d6PRa1CA",
  authDomain: "infinity-notes-by-infinity.firebaseapp.com",
  projectId: "infinity-notes-by-infinity",
  storageBucket: "infinity-notes-by-infinity.appspot.com",
  messagingSenderId: "1049906298543",
  appId: "1:1049906298543:web:05ebedfff091b61bcd9e5a",
  measurementId: "G-4G22M65LNS"
};
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: 'https://infinity-jigarii-notes.netlify.app/',
  // This must be true for email link sign-in.
  handleCodeInApp: true,
  iOS: {
    bundleId: 'com.example.ios',
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12',
  },
  // FDL custom domain.
  dynamicLinkDomain: 'coolapp.page.link',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
auth.languageCode = 'it';

export {app,auth,db, actionCodeSettings};

// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdEqN4rMsAZadKDCP7TsKfx5fLRkroVFo",
    authDomain: "hackathon-e2197.firebaseapp.com",
    projectId: "hackathon-e2197",
    storageBucket: "hackathon-e2197.appspot.com",
    messagingSenderId: "672226894103",
    appId: "1:672226894103:web:f816562a983e3d5d8f9752",
    measurementId: "G-GXNL6WJ4J1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoY0G2scsDwSkmucJTG80YjsHB-quDY8o",
  authDomain: "atcportal-3d793.firebaseapp.com",
  projectId: "atcportal-3d793",
  storageBucket: "atcportal-3d793.firebasestorage.app",
  messagingSenderId: "608056055100",
  appId: "1:608056055100:web:629e59049c376cc19cba39",
  measurementId: "G-Z4VJ65D62J",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBYfxCqts_d_CvenX3aivTQjI4wz5d-0Fo",
    authDomain: "blooddonation-8da1f.firebaseapp.com",
    projectId: "blooddonation-8da1f",
    storageBucket: "blooddonation-8da1f.firebasestorage.app",
    messagingSenderId: "726066130481",
    appId: "1:726066130481:web:9507bbbd87e1147acd6f10",
    measurementId: "G-MGS0SPQY7N"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // Export auth instance here
export const storage = getStorage(app);

export default app;
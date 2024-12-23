// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8S42uxeu8uS-rmBe13wcmsuCbYIPagrk",
    authDomain: "firebas-dba7f.firebaseapp.com",
    projectId: "firebas-dba7f",
    storageBucket: "firebas-dba7f.firebasestorage.app",
    messagingSenderId: "990253684351",
    appId: "1:990253684351:web:9052ca50c6322c22de914a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authencation referans frontende alma
export const auth = getAuth(app);

// google saglayıcı
export const provider = new GoogleAuthProvider();

//  Veritabanının referansını al
export const db = getFirestore(app)
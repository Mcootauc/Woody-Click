import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDBMRE7mDd3UbCoBZT2nLVBso2XTe-Erv8",
    authDomain: "tree-clicker.firebaseapp.com",
    projectId: "tree-clicker",
    storageBucket: "tree-clicker.appspot.com",
    messagingSenderId: "821047874376",
    appId: "1:821047874376:web:7458635c73cdfc8e0c197d",
    measurementId: "G-9JZZ6969TE"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
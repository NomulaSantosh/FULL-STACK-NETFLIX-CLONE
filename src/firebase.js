//before doing all this download "npm install firebase react-firebase-hooks"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc,collection,getFirestore } from "firebase/firestore";
import { toast } from 'react-toastify';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOBaM0lHoRSzi60jFJIA3PeBAzI8tLPn8",
  authDomain: "tnetflixclone-24c26.firebaseapp.com",
  projectId: "tnetflixclone-24c26",
  storageBucket: "tnetflixclone-24c26.firebasestorage.app",
  messagingSenderId: "858120509193",
  appId: "1:858120509193:web:09ff6bd602b6bc68c9e5d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializing the firebase authentication
const auth = getAuth(app);
//initialize the fire store for the database
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        // from the "response" we will find the user details that is stored in "user" property
        const user = response.user;
        // now we will store the user in firestore database
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxHNSl0CspzK7rDbFN_lclL5zgFkocokA",
  authDomain: "house-marketplace-app-b8cd5.firebaseapp.com",
  projectId: "house-marketplace-app-b8cd5",
  storageBucket: "house-marketplace-app-b8cd5.appspot.com",
  messagingSenderId: "539309630081",
  appId: "1:539309630081:web:5e25c6ed6aa3e3f5726380"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()

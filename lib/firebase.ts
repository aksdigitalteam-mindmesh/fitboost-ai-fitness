// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArEt98FlADZ9bdoRG6skivsPO_UQAixkI",
  authDomain: "fitboost-ktlnv.firebaseapp.com",
  projectId: "fitboost-ktlnv",
  storageBucket: "fitboost-ktlnv.firebasestorage.app",
  messagingSenderId: "899041749945",
  appId: "1:899041749945:web:6399e7ce2c329340206468",
  measurementId: "G-KXVPM5PWPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "mern-auth-d1976.firebaseapp.com",
  projectId: "mern-auth-d1976",
  storageBucket: "mern-auth-d1976.appspot.com",
  messagingSenderId: "779654113827",
  appId: "1:779654113827:web:f38ff612214dcd84611f96"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSaQQGTab4XkyTDcVxA4s07m3N8KlYD7k",
  authDomain: "https://incterminal-88156.web.app/",
  projectId: "incterminal-88156",
  storageBucket: "incterminal-88156.appspot.com",
  messagingSenderId: "635818492905",
  appId: "1:635818492905:web:8f321bbe5bef7800078178",
  measurementId: "G-0VY14L4ZM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

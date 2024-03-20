// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOshsr_f422QOgFGCtG6F2HFvAy4DIqpg",
  authDomain: "journal-buddy-bfa71.firebaseapp.com",
  databaseURL: "https://journal-buddy-bfa71-default-rtdb.firebaseio.com",
  projectId: "journal-buddy-bfa71",
  storageBucket: "journal-buddy-bfa71.appspot.com",
  messagingSenderId: "750765241871",
  appId: "1:750765241871:web:cf391de4e20373bb9f957a",
  measurementId: "G-Q0VF0V7M1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmJMThnvZTRyYwrfE50A_dJFuvZezPsnA",
  authDomain: "doctors-insight.firebaseapp.com",
  projectId: "doctors-insight",
  storageBucket: "doctors-insight.appspot.com",
  messagingSenderId: "466216181082",
  appId: "1:466216181082:web:7f0322c26fbd6e43ece763"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
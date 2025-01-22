import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDO4NHaOA8uAwwnE9OjrKVUkprFb8jpkPA",
  authDomain: "inter-weather.firebaseapp.com",
  projectId: "inter-weather",
  storageBucket: "inter-weather.firebasestorage.app",
  messagingSenderId: "475139020808",
  appId: "1:475139020808:web:320898f738dbac107d19bd",
  measurementId: "G-N10N3EC19T"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


// Initialize Firebase Authentication and get a reference to the service
export const FIREBASE_AUTH = getAuth(app);
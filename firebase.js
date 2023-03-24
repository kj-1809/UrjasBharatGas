// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from 'firebase/auth/react-native'
// import { getAnalytics } from "firebase/analytics";
import {getAuth , initializeAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBw5qKpMJq131-ixPZs7z84U0tA3jM2X8", 
  authDomain: "urjas-bharat-gas.firebaseapp.com",
  projectId: "urjas-bharat-gas",
  storageBucket: "urjas-bharat-gas.appspot.com",
  messagingSenderId: "285482540735",
  appId: "1:285482540735:web:1cf3c019b0c56336e4700a",
  measurementId: "G-04BTZREL78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
// const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db , app};

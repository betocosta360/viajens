import { initializeApp, getApp, FirebaseApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importando o Storage

const firebaseConfig = {
  apiKey: "AIzaSyC88Mv8ExF4bsGtGMkmjn3YuFoP4LzeywQ",
  authDomain: "travels-5d64d.firebaseapp.com",
  projectId: "travels-5d64d",
  storageBucket: "travels-5d64d.appspot.com",
  messagingSenderId: "782529882355",
  appId: "1:782529882355:web:e72983378e557528a6ef86",
  measurementId: "G-MF9JH6H32Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Inicializando o Firestore e o Storage
export const db = getFirestore(app);
export const storage = getStorage(app); // Inicializando o Storage

export { app, auth, getApp, getAuth };

import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD8MPc1BfG5CozaH--puNy_nfTk6ftEJs0",
  authDomain: "bpci-alerte.firebaseapp.com",
  databaseURL: "https://bpci-alerte-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bpci-alerte",
  storageBucket: "bpci-alerte.appspot.com",
  messagingSenderId: "939126110816",
  appId: "1:939126110816:web:fb12cafc43d3d20fbb2105",
  measurementId: "G-BTTVRCC8C7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const logOut = async () => {
  try {
    return await signOut(auth);
  } catch (err) {
    console.error(err);
    return;
  }
};

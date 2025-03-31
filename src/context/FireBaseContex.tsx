import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARqyEvqJqfGRckYc1saD1r7YgN8fjctdk",
  authDomain: "swiftbooks-97e59.firebaseapp.com",
  projectId: "swiftbooks-97e59",
  storageBucket: "swiftbooks-97e59.firebasestorage.app",
  messagingSenderId: "577015957923",
  appId: "1:577015957923:web:b8a20ec9b00d2bc8b1f216",
  measurementId: "G-XNY7DRXPQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, db, storage, app };
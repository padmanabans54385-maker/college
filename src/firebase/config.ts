import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgx6WWDdWPkmXVi5OJiq-xl61KbXa-ToA",
  authDomain: "collegecrop-235bc.firebaseapp.com",
  projectId: "collegecrop-235bc",
  storageBucket: "collegecrop-235bc.firebasestorage.app",
  messagingSenderId: "667419423503",
  appId: "1:667419423503:web:a6411d7e977407975f847a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
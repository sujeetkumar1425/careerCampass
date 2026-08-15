import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAogCrjXZN2lazBg56jvs7E8sUMXBYPIiw",
  authDomain: "careercompass-1.firebaseapp.com",
  projectId: "careercompass-1",
  storageBucket: "careercompass-1.firebasestorage.app",
  messagingSenderId: "865528362318",
  appId: "1:865528362318:web:f88b4e5d336679093a5a1f",
  measurementId: "G-LN19RVCYPS"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();





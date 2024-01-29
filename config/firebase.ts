import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
import { useUrl } from "nextjs-current-url";

/*
const firebaseConfig = {
  apiKey: process.env.F_APIKEY,
  authDomain: process.env.F_AUTHDOMAIN,
  projectId: process.env.F_PROJECT_ID,
  storageBucket: process.env.F_STORAGE_BUCKET,
  appId: process.env.F_APP_ID,
  measurementId: process.env.F_MEASUREMENT_ID,
  type: process.env.F_TYPE,
};
*/

const firebaseConfig = {
  apiKey: "AIzaSyDbo_cN1goy7sPWU1xnN5JmA05vn6GWjnM",
  authDomain: "wokr-project.firebaseapp.com",
  projectId: "wokr-project",
  storageBucket: "wokr-project.appspot.com",
  //messagingSenderId: "189580592206",
  appId: "1:189580592206:web:5df7e969d662fde3976f1f",
  measurementId: "G-1P3V15SXE8",
  type: "service_account",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const actionCodeSettings = {
  url: "https://fascinating-lamington-d30913.netlify.app/complete-registration",
  //url: "http://localhost:3000/complete-registration",
  handleCodeInApp: true,
};

export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
export default app;

import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../config/_fbServiceAccountKey.json" assert { type: "json" };

// Initialize the Firebase app with credentials
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Auth check function
export const authCheck = async (req) => {
  try {
    const currentUser = await getAuth().verifyIdToken(req.headers.authtoken);
    console.log("CURRENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.log("AUTH CHECK ERROR", error);
    throw new Error("Invalid or expired token");
  }
};

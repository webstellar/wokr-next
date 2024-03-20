import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../config/_fbServiceAccountKey.json" assert { type: "json" };

if (!admin.apps.length) {
  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
// Auth check function
export const authCheck = async (token) => {
  try {
    const currentUser = await getAuth().verifyIdToken(token);
    console.log("CURRENT USER", currentUser);
    return currentUser;
  } catch (error) {
    console.log("AUTH CHECK ERROR", error);
    throw new Error("Invalid or expired token");
  }
};

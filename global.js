/* ----------------------------------------------------------
   GLOBAL FIREBASE APP CONFIG
   This file is imported by EVERY page.
----------------------------------------------------------- */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ----------------------------------------------------------
   YOUR FIREBASE PROJECT CONFIG (LIVE SETTINGS)
----------------------------------------------------------- */

export const firebaseConfig = {
  apiKey: "AIzaSyB7GclJLT79eSM0WAYAcWSYm-VMYTbJFPk",
  authDomain: "construction-management-f48cb.firebaseapp.com",
  projectId: "construction-management-f48cb",
  storageBucket: "construction-management-f48cb.appspot.com",
  messagingSenderId: "1013804592434",
  appId: "1:1013804592434:web:79226b78462dbfbd519f2b"
};

/* ----------------------------------------------------------
   INITIALIZE FIREBASE SERVICES
----------------------------------------------------------- */

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/* ----------------------------------------------------------
   HELPER: Get current user role
----------------------------------------------------------- */
export async function getUserRole(uid) {
  const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data().role;
}

/* ----------------------------------------------------------
   AUTH PROTECTION HELPERS
----------------------------------------------------------- */
export function requireAdmin(user, role) {
  if (role !== "admin") {
    alert("Admins only.");
    window.location.href = "index.html";
  }
}

export function requireCustomer(user, role) {
  if (role !== "customer") {
    alert("Customers only.");
    window.location.href = "index.html";
  }
}

export function requireSub(user, role) {
  if (role !== "subcontractor") {
    alert("Subcontractors only.");
    window.location.href = "index.html";
  }
}

/* ----------------------------------------------------------
   PARSE URL PROJECT ID
----------------------------------------------------------- */
export function getProjectIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("projectId");
}

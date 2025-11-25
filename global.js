/* ---------------------------------------------------------
   GLOBAL FIREBASE CONFIG + AUTH + HELPERS
--------------------------------------------------------- */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

/* ---------------------------------------------------------
   FIREBASE INIT
--------------------------------------------------------- */
export const firebaseConfig = {
  apiKey: "AIzaSyB7GclJLT79eSM0WAYAcWSYm-VMYTbJFPk",
  authDomain: "construction-management-f48cb.firebaseapp.com",
  projectId: "construction-management-f48cb",
  storageBucket: "construction-management-f48cb.appspot.com",
  messagingSenderId: "1013804592434",
  appId: "1:1013804592434:web:79226b78462dbfbd519f2b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/* ---------------------------------------------------------
   AUTH HELPERS
--------------------------------------------------------- */

// Create new Admin
export async function createAdmin(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "admins", cred.user.uid), {
    email: email,
    role: "admin",
    created: new Date().toISOString()
  });
  return cred.user;
}

// Login user (admin or customer or subcontractor)
export async function loginUser(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// Logout
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html";
}

/* ---------------------------------------------------------
   PAGE ACCESS CONTROL
--------------------------------------------------------- */

// Protect admin-only pages
export function protectAdminPage() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const adminRef = doc(db, "admins", user.uid);
    const snap = await getDoc(adminRef);

    if (!snap.exists()) {
      alert("Access denied – not an admin.");
      logoutUser();
    }
  });
}

// Protect customer-only pages
export function protectCustomerPage() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const refUser = doc(db, "customers", user.uid);
    const snap = await getDoc(refUser);

    if (!snap.exists()) {
      alert("Access denied – customers only.");
      logoutUser();
    }
  });
}

// Protect subcontractor-only pages
export function protectSubPage() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const refUser = doc(db, "subcontractors", user.uid);
    const snap = await getDoc(refUser);

    if (!snap.exists()) {
      alert("Access denied – subcontractors only.");
      logoutUser();
    }
  });
}

/* ---------------------------------------------------------
   FIRESTORE HELPERS
--------------------------------------------------------- */

export async function createProject(name, customerId) {
  return await addDoc(collection(db, "projects"), {
    projectName: name,
    customerId,
    status: "in-progress",
    created: new Date().toISOString()
  });
}

export async function getAllProjects() {
  const snap = await getDocs(collection(db, "projects"));
  const list = [];
  snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
  return list;
}

export async function uploadFileToProject(projectId, file, category) {
  const path = `documents/${projectId}/${Date.now()}_${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  await addDoc(collection(db, "projects", projectId, "documents"), {
    url,
    category,
    fileName: file.name,
    uploaded: new Date().toISOString()
  });
}

/* ---------------------------------------------------------
   SIMPLE LOGOUT BUTTON ATTACHER
--------------------------------------------------------- */

export function attachLogout(btnId) {
  const btn = document.getElementById(btnId);
  if (btn) {
    btn.addEventListener("click", logoutUser);
  }
}

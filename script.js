// Firebase CDN imports
import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc }
    from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJmJmvfG_iK62GTL_UgiTCv8J_Y1Dv0",
  authDomain: "construction-management-f48cb.firebaseapp.com",
  projectId: "construction-management-f48cb",
  storageBucket: "construction-management-f48cb.appspot.com",
  messagingSenderId: "1013804592434",
  appId: "1:1013804592434:web:79226b78462dbfd519f2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// CREATE ADMIN
window.createAdmin = async function () {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      role: "admin",
      email: email
    });

    alert("Admin created successfully!");
  } catch (error) {
    alert(error.message);
  }
};

// LOGIN
window.login = async function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in successfully!");
  } catch (error) {
    alert(error.message);
  }
};

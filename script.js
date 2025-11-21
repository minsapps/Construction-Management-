// Load Firebase using CDN (because GitHub Pages cannot use import statements)

// Your Firebase config from the screenshot
const firebaseConfig = {
  apiKey: "AIzaSyB0QjmJmvfG_iK62GTL_UgiTcv8J_Y1Dv0",
  authDomain: "construction-management-f48cb.firebaseapp.com",
  projectId: "construction-management-f48cb",
  storageBucket: "construction-management-f48cb.appspot.com",
  messagingSenderId: "1013084592344",
  appId: "1:1013084592344:web:79226b78462dbfbd519f2b"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Admin Account Creation
async function createAdmin() {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  try {
    await auth.createUserWithEmailAndPassword(email, password);
    alert("Admin account created!");
  } catch (error) {
    alert("Firebase Error: " + error.message);
  }
}

// Login Function
async function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = "admin.html";
  } catch (error) {
    alert("Login Error: " + error.message);
  }
}

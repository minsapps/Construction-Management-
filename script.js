// ---------- FIREBASE CONFIG (NEW WORKING ONE) ----------
var firebaseConfig = {
    apiKey: "AIzaSyB7GclJLT79eSM0WAYAcWSYm-VMYTbJFPk",
    authDomain: "construction-management-f48cb.firebaseapp.com",
    projectId: "construction-management-f48cb",
    storageBucket: "construction-management-f48cb.appspot.com",
    messagingSenderId: "1013084592344",
    appId: "1:1013084592344:web:1ac50bf8085ce443519f2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth
const auth = firebase.auth();


// Create Admin Account
async function createAdmin() {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Admin account created!");
    } catch (error) {
        alert("ERROR: " + error.message);
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

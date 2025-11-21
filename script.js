// --- FIREBASE INITIALIZATION (v8 CDN format) ---

var firebaseConfig = {
    apiKey: "AIzaSyB0QjmJmvfG_iK62GTL_UgiTcv8J_Y1Dv0",
    authDomain: "construction-management-f48cb.firebaseapp.com",
    projectId: "construction-management-f48cb",
    storageBucket: "construction-management-f48cb.appspot.com",
    messagingSenderId: "1013084592344",
    appId: "1:1013084592344:web:79226b78462dbfbd519f2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get auth service
const auth = firebase.auth();

// Create Admin
async function createAdmin() {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Admin Created!");
    } catch (error) {
        alert("ERROR: " + error.message);
    }
}

// Login
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

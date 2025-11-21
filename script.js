// Firebase configuration (corrected storage bucket)
const firebaseConfig = {
    apiKey: "AIzaSyB0QjmJmvfG_iK62GTL_UgiTcv8J_Y1Dv0",
    authDomain: "construction-management-f48cb.firebaseapp.com",
    projectId: "construction-management-f48cb",
    storageBucket: "construction-management-f48cb.appspot.com",
    messagingSenderId: "1013084592344",
    appId: "1:1013084592344:web:79226b78462dbfbd519f2b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

console.log("Firebase SDK loaded");

// Create Admin Function
async function createAdmin() {
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Admin created successfully!");
    } catch (error) {
        alert("Firebase Error: " + error.message);
    }
}

// Login Function
async function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please enter login email and password.");
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Login successful!");
        window.location.href = "admin.html"; 
    } catch (error) {
        alert("Login Error: " + error.message);
    }
}

// Make functions available globally for HTML buttons
window.createAdmin = createAdmin;
window.loginUser = loginUser;

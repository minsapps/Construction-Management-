// LOGIN FUNCTION
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    window.location.href = "dashboard.html"; // redirect to dashboard
  } catch (error) {
    document.getElementById("error-message").innerText = error.message;
  }
}

// CREATE ADMIN ACCOUNT
async function createAdmin() {
  const email = document.getElementById("admin-email").value;
  const password = document.getElementById("admin-password").value;

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
// Save admin role in Firestore
await db.collection("users").doc(userCredential.user.uid).set({
  role: "admin"
});

alert("Admin created successfully!");
  } catch (error) {
    alert(error.message);
  }
}
// ROLE CHECKER AFTER LOGIN
auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  // Get user role from Firestore
  const docRef = db.collection("users").doc(user.uid);
  const doc = await docRef.get();

  if (doc.exists) {
    const role = doc.data().role;

    if (role === "admin") {
      window.location.href = "admin.html";
    } else if (role === "contractor") {
      window.location.href = "contractor.html";
    } else if (role === "customer") {
      window.location.href = "customer.html";
    }
  }
});

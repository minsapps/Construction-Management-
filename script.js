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
    alert("Admin created successfully!");
  } catch (error) {
    alert(error.message);
  }
}

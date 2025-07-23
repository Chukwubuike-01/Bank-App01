// Simple in-memory user store (for testing purposes)
const users = [];

// Element references
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginMessage = document.getElementById("loginMessage");
const registerMessage = document.getElementById("registerMessage");

const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");

const switchToRegister = document.getElementById("switchToRegister");
const switchToLogin = document.getElementById("switchToLogin");

// Switch view functions
switchToRegister?.addEventListener("click", () => {
  loginCard.style.display = "none";
  registerCard.style.display = "block";
});

switchToLogin?.addEventListener("click", () => {
  registerCard.style.display = "none";
  loginCard.style.display = "block";
});

// 🔐 LOGIN FUNCTION
loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const pin = document.getElementById("pin").value.trim();

  const user = users.find((user) => user.username === username && user.pin === pin);

  if (user) {
    loginMessage.style.color = "green";
    loginMessage.textContent = "Login successful! Redirecting...";
    setTimeout(() => {
      window.location.href = "dashboard.html"; // ✅ REDIRECT
    }, 1000);
  } else {
    loginMessage.style.color = "red";
    loginMessage.textContent = "Invalid username or PIN!";
  }
});

// 📝 REGISTER FUNCTION
registerForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  const newUsername = document.getElementById("newUsername").value.trim();
  const newPin = document.getElementById("newPin").value.trim();
  const confirmPin = document.getElementById("confirmPin").value.trim();

  // Check if username already exists
  const userExists = users.some((user) => user.username === newUsername);

  if (userExists) {
    registerMessage.style.color = "red";
    registerMessage.textContent = "Username already exists!";
    return;
  }

  if (newPin !== confirmPin) {
    registerMessage.style.color = "red";
    registerMessage.textContent = "PINs do not match!";
    return;
  }

  if (newPin.length !== 4 || isNaN(newPin)) {
    registerMessage.style.color = "red";
    registerMessage.textContent = "PIN must be 4 digits!";
    return;
  }

  // Add new user
  users.push({ username: newUsername, pin: newPin });
  registerMessage.style.color = "green";
  registerMessage.textContent = "Registration successful! Redirecting...";

  setTimeout(() => {
    registerCard.style.display = "none";
    loginCard.style.display = "block";
  }, 1000);
});

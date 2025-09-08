//HTML ELEMENTS
const root = document.getElementById("root");

//GLOBAL VARIABLES

//EVENTLISTENERS

//FUNCTIONS
const isUserLoggedIn = () => {
  let username = localStorage.getItem("username");
  console.log(username);
  if (username) {
    return true;
  }
  return false;
};

const LogOut = () => {
  localStorage.removeItem("username");
};
const OpenLoginForm = () => {
  if (isUserLoggedIn()) return;

  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  const usernameInput = document.createElement("input");
  usernameInput.name = "username";
  usernameInput.placeholder = "username";
  usernameInput.type = "text";

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.type = "password";

  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.type = "submit";

  loginForm.appendChild(usernameInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(loginButton);

  root.appendChild(loginForm);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(loginForm);

    let username = data.get("username");
    let password = data.get("password");

    let validation = validateCredentials(username, password);

    if (!validation) {
      console.log("validation problem");
    } else {
      saveUsernameToLocalStorage(username);
      closeLoginForm()
    }

    console.log(username);
    console.log(password);
  });
};
const closeLoginForm = () => {
  const form = document.querySelector(".login-form");
  if (form) root.removeChild(form);
};
const OpenWelcomePage = () => {
    if (!isUserLoggedIn()) return;

    const homeContainer = document.createElement("div");
    homeContainer.classList.add("home-container");

    const welcomeText = document.createElement("h1")
    welcomeText.textContent = "Welcome"

    const logoutButton = document.createElement("button")
    logoutButton.textContent = "Logout"

    homeContainer.appendChild(welcomeText)
    homeContainer.appendChild(logoutButton)
}
const validateCredentials = (username, password) => {
  if (username.length <= 6 || username === "") {
    console.log("error username is less than 6 chars long");
    return false;
  }
  if (password.length <= 6 || password === "") {
    console.log("error username is less than 6 chars long");
    return false;
  }
  return true;
};
const saveUsernameToLocalStorage = (username) => {
  localStorage.setItem("username", username);
};

const renderPage = () => {
  OpenLoginForm();
};
renderPage();

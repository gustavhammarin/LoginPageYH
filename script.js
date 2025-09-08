//HTML ELEMENTS
const root = document.getElementById("root");

//GLOBAL VARIABLES
let state = {
  loggedIn: !!localStorage.getItem("username"),
  username: localStorage.getItem("username") || null,
};
console.log(state.loggedIn);
console.log(state.username);
//EVENTLISTENERS

//FUNCTIONS
const OpenLoginForm = () => {
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

  //EVENTLISTENER
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
      state.loggedIn = true;
      render();
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
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  const welcomeText = document.createElement("h1");
  welcomeText.textContent = "Welcome";

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";

  homeContainer.appendChild(welcomeText);
  homeContainer.appendChild(logoutButton);

  root.appendChild(homeContainer);

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearLocalstorage();
    state.loggedIn = false;
    render();
  });
};
const closeWelcomePage = () => {
  const home = document.querySelector(".home-container");
  if (home) root.removeChild(home);
};
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
  if (state.username === null) {
    localStorage.setItem("username", username);
  }
};
const clearLocalstorage = () => {
  if (state.username != null) {
    localStorage.removeItem("username");
  }
};
const render = () => {
  closeLoginForm();
  closeWelcomePage();

  if (!state.loggedIn) {
    OpenLoginForm();
  } else {
    OpenWelcomePage();
  }
};
render();

//HTML ELEMENTS
const root = document.getElementById("root");

//GLOBAL VARIABLES
const state = {
  loggedIn: !!localStorage.getItem("username"),
};

const credentials = {
  username: "test",
  password: "1234",
};

let isLoginFormOpen = true;
let isRegistrationFormOpen = false;

const users = []

class User {
  constructor(username, password){
    this.username = username,
    this.password = password
  }
}

render();

//FUNCTIONS
function OpenLoginForm() {
  isLoginFormOpen = true;
  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  const heading = document.createElement("h1");
  heading.textContent = "Login";

  const usernameInput = document.createElement("input");
  usernameInput.name = "username";
  usernameInput.placeholder = "username";
  usernameInput.type = "text";
  const errorLabel = document.createElement("label");
  errorLabel.id = "error-label";

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.type = "password";

  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.type = "submit";

  const registrationFormLink = document.createElement("button");
  registrationFormLink.textContent = "Register";

  loginForm.append(
    heading,
    errorLabel,
    usernameInput,
    passwordInput,
    loginButton,
    registrationFormLink
  );

  root.appendChild(loginForm);

  //EVENTLISTENER
  registrationFormLink.addEventListener("click", (e) => toggleForms(e));
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(loginForm);

    const username = data.get("username");
    const password = data.get("password");

    const error = validateCredentials(username, password);

    if (!error) {
      saveUsernameToLocalStorage(username);
      state.loggedIn = true;
      render();
    } else {
      showErrorToast(error);
    }
  });
}
function OpenRegistrationForm() {
  isRegistrationFormOpen = true;

  const registrationForm = document.createElement("form");
  registrationForm.classList.add("login-form");

  const heading = document.createElement("h1");
  heading.textContent = "Register";

  const usernameInput = document.createElement("input");
  usernameInput.name = "username";
  usernameInput.placeholder = "username";
  usernameInput.type = "text";
  const errorLabel = document.createElement("label");
  errorLabel.id = "error-label";

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.type = "password";

  const loginButton = document.createElement("button");
  loginButton.textContent = "Register";
  loginButton.type = "submit";

  const loginFormLink = document.createElement("button");
  loginFormLink.textContent = "Login";

  registrationForm.append(
    heading,
    errorLabel,
    usernameInput,
    passwordInput,
    loginButton,
    loginFormLink
  );

  root.appendChild(registrationForm);

  //EventListeners
  loginFormLink.addEventListener("click", (e) => toggleForms(e));
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const data = new FormData(registrationForm);

    const user = new User(data.get("username"), data.get("password"));
    users.push(user)
    localStorage.removeItem("users")
    localStorage.setItem("users", JSON.stringify(users))
    toggleForms(e);

  })
}
function close() {
  const form = document.querySelector(".login-form");
  if (form) root.removeChild(form);
  const home = document.querySelector(".home-container");
  if (home) root.removeChild(home);
}
function OpenWelcomePage() {
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  const welcomeText = document.createElement("h1");
  welcomeText.textContent = "Welcome";

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";

  homeContainer.append(welcomeText, logoutButton);

  root.appendChild(homeContainer);

  //EVENTLISTENER
  logoutButton.addEventListener("click", () => {
    clearLocalstorage();
    state.loggedIn = false;
    render();
  });
}

function validateCredentials(username, password) {
  const error = "Incorrect username or password";
  const users = JSON.parse(localStorage.getItem("users"));
  const isUser = !!users.find(user => user.username === username && user.password === password);
  if(!isUser){
    return error
  }
  
/*   if (username !== credentials.username || password !== credentials.password) {
    return error;
  } */
}
function showErrorToast(error) {
  const errorLabel = document.getElementById("error-label");
  errorLabel.textContent = error;
}
function saveUsernameToLocalStorage(username) {
  localStorage.setItem("username", username);
}
function clearLocalstorage() {
  localStorage.removeItem("username");
}
function toggleForms(e) {
  e.preventDefault();
  if (isLoginFormOpen) {
    isLoginFormOpen = false;
    isRegistrationFormOpen = true;
  } else if (isRegistrationFormOpen) {
    isLoginFormOpen = true;
    isRegistrationFormOpen = false;
  }
  render()
}
function render() {
  close();

  if (!state.loggedIn) {
    if (isLoginFormOpen && !isRegistrationFormOpen) {
      OpenLoginForm();
    } else if (!isLoginFormOpen && isRegistrationFormOpen) {
      OpenRegistrationForm();
    }
  } else {
    OpenWelcomePage();
  }
}

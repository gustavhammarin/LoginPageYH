//HTML ELEMENTS
const root = document.getElementById("root");

//GLOBAL VARIABLES
let state = {
  loggedIn: !!localStorage.getItem("username"),
  username: localStorage.getItem("username") || null,
};

const credentials = {
  username: "test",
  password: "1234",
};

//EVENTLISTENERS

//FUNCTIONS
const OpenLoginForm = () => {
  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

    const heading = document.createElement("h1")
    heading.textContent = "Login"

  const usernameInput = document.createElement("input");
  usernameInput.name = "username";
  usernameInput.placeholder = "username";
  usernameInput.type = "text";
  const usernameLabel = document.createElement("label")
  usernameLabel.id = "username-label"

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.type = "password";
  const passwordLabel = document.createElement("label")
  passwordLabel.id = "password-label"

  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.type = "submit";

  loginForm.appendChild(heading)
  loginForm.appendChild(usernameLabel)
  loginForm.appendChild(usernameInput);
  loginForm.appendChild(passwordLabel)
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(loginButton);

  root.appendChild(loginForm);

  //EVENTLISTENER
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(loginForm);

    let username = data.get("username");
    let password = data.get("password");

    let errors = validateCredentials(username, password);

    if (errors.length === 0) {
      saveUsernameToLocalStorage(username);
      state.loggedIn = true;
      render();
    } else {
        showErrorToast(errors)
    }
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
  let errors = [];
  if (username != credentials.username) {
    let error = {
        usernameError: "Incorrect username"
    };
    errors.push(error);
  }
  if (password != credentials.password) {
    let error = {
        passwordError: "Incorrect password"
    }
    errors.push(error);
  }
  console.log(errors)
  return errors;
};
const showErrorToast = (errors) => {
    let usernameError = errors.find(err => err.usernameError)?.usernameError
    let passwordError = errors.find(err => err.passwordError)?.passwordError


    let usernameLabel = document.getElementById("username-label")
    usernameLabel.textContent = usernameError
    let passwordLabel = document.getElementById("password-label")
    passwordLabel.textContent = passwordError
}
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

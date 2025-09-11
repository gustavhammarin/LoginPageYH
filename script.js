//HTML ELEMENTS
const root = document.getElementById("root");

//GLOBAL VARIABLES
const state = {
  loggedIn: !!localStorage.getItem("username")
};

const credentials = {
  username: "test",
  password: "1234",
};

render();

//FUNCTIONS
function OpenLoginForm () {
  const loginForm = document.createElement("form");
  loginForm.classList.add("login-form");

  const heading = document.createElement("h1")
  heading.textContent = "Login"

  const usernameInput = document.createElement("input");
  usernameInput.name = "username";
  usernameInput.placeholder = "username";
  usernameInput.type = "text";
  const errorLabel = document.createElement("label")
  errorLabel.id = "error-label"

  const passwordInput = document.createElement("input");
  passwordInput.name = "password";
  passwordInput.placeholder = "password";
  passwordInput.type = "password";

  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.type = "submit";

  loginForm.appendChild(heading)
  loginForm.appendChild(errorLabel)
  loginForm.appendChild(usernameInput);
  loginForm.appendChild(passwordInput);
  loginForm.appendChild(loginButton);

  root.appendChild(loginForm);

  //EVENTLISTENER
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
        showErrorToast(error)
    }
  });
};
function closeLoginForm () {
  const form = document.querySelector(".login-form");
  if (form) root.removeChild(form);
};
function OpenWelcomePage () {
  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");

  const welcomeText = document.createElement("h1");
  welcomeText.textContent = "Welcome";

  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";

  homeContainer.appendChild(welcomeText);
  homeContainer.appendChild(logoutButton);

  root.appendChild(homeContainer);

  //EVENTLISTENER
  logoutButton.addEventListener("click", () => {
    clearLocalstorage();
    state.loggedIn = false;
    render();
  });
};
function closeWelcomePage () {
  const home = document.querySelector(".home-container");
  if (home) root.removeChild(home);
};
function validateCredentials (username, password) {
    const error = "Incorrect username or password"
    if (username != credentials.username || password != credentials.password){
        return error
    }
};
function showErrorToast (error) {
    const errorLabel = document.getElementById("error-label")
    errorLabel.textContent = error
}
function saveUsernameToLocalStorage (username) {
    localStorage.setItem("username", username);
};
function clearLocalstorage () {
    localStorage.removeItem("username");
};
function render () {
  closeLoginForm();
  closeWelcomePage();

  if (!state.loggedIn) {
    OpenLoginForm();
  } else {
    OpenWelcomePage();
  }
};


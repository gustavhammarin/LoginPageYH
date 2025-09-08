//HTML ELEMENTS
const root = document.getElementById("root")

const loginForm = document.createElement("form")
loginForm.classList.add("login-form")

const usernameInput = document.createElement("input")
usernameInput.name = "username"
usernameInput.placeholder = "username"
usernameInput.type = "text"

const passwordInput = document.createElement("input")
passwordInput.name = "password"
passwordInput.placeholder = "username"
passwordInput.type = "password"

const loginButton = document.createElement("button")
loginButton.textContent = "Login"
loginButton.type = "submit"

loginForm.appendChild(usernameInput)
loginForm.appendChild(passwordInput)
loginForm.appendChild(loginButton)
//GLOBAL VARIABLES
let isLoginModal = true

//EVENTLISTENERS

//FUNCTIONS
const isUserLoggedIn = () => {}

const Login = () => {}

const LogOut = () => {}

const isLoginModalOpen = () => {
  if (isLoginModal) {
    root.appendChild(loginForm)
  }

  console.log("modal is open")
}

isLoginModalOpen()

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
passwordInput.placeholder = "password"
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
loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const data = new FormData(loginForm)

    let username = data.get("username")
    let password = data.get("password")

    let validation = validateCredentials(username, password)

    if (validation === false){
        console.log("validation problem")
    } else {
        root.removeChild(loginForm)
    }

    console.log(username)
    console.log(password)
})

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
const validateCredentials = (username, password) => {
    if (username.length <= 6 || username === ""){
        console.log("error username is less than 6 chars long")
        return false;
    }
    if (password.length <= 6 || password === ""){
        console.log("error username is less than 6 chars long")
        return false;
    }
    return true;
}

isLoginModalOpen()




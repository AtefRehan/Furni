import {UserStorageManager} from "../../../utils/managers/user_storage_manager.js";

let emailField = document.querySelector("#email_signin");
let passwordField = document.querySelector("#password_signin");
let loginButton = document.querySelector("#signIn");
const userStorageManager = new UserStorageManager();

loginButton.addEventListener("click", function (e) {
    e.preventDefault();

    const existingUser = userStorageManager.getUserByEmail(emailField.value);

    if (existingUser && existingUser.password === passwordField.value) {
        window.location.href = "../../home/presentation/index.html?userEmail=" + emailField.value;
    } else {
        document.querySelector("#msg").innerHTML = "Invalid email or password";
    }
});
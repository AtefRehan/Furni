import * as validator from "../../../utils/helper/validation.js";
import {UserStorageManager} from "../../../utils/managers/user_storage_manager.js";

let name = document.querySelector("#username");
let password = document.querySelector("#password");
let button = document.querySelector("#signUpButton");
let email = document.querySelector("#email");
let mobileNumber = document.querySelector("#mobileNumber");
let userStorageManager = new UserStorageManager();
let userData = {};

name.focus();
name.addEventListener("blur", function () {
  if (!validator.validateName(name.value)) {
    name.className = "wrong";
  } else {
    name.className = "correct";
  }
});

password.addEventListener("blur", function () {
  if (!validator.isValidPassword(password.value)) {
    password.className = "wrong";
  } else {
    password.className = "correct";
  }
});

email.addEventListener("blur", function () {
  if (!validator.isValidEmail(email.value)) {
    email.className = "wrong";
  } else {
    email.className = "correct";
  }
});

mobileNumber.addEventListener("blur", function () {
  if (!validator.isValidMobileNumber(mobileNumber.value)) {
    mobileNumber.className = "wrong";
  } else {
    mobileNumber.className = "correct";
  }
});

button.addEventListener("click", function (e) {
  e.preventDefault();
  let captionMsg = document.querySelector("#msg");
  console.log("Register button clicked");
  if (
    validator.isValidEmail(email.value) &&
    validator.validateName(name.value) &&
    validator.isValidPassword(password.value)
  ) {
    console.log("right validation");
    userData = {
      username: name.value,
      email: email.value,
      mobileNumber: mobileNumber.value,
      password: password.value,
    };

    if (!userStorageManager.getUserByEmail(userData.email)) {
      console.log("Add new user");
      userStorageManager.addUser(userData);
      alert(`Hi ${userData.username}`);
      window.location.href = "../../home/presentation/index.html?userEmail=" + userData.email;
    } else {
      captionMsg.innerHTML = "This email is already in use";
    }
  }
});
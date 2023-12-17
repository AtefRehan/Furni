export const checkSignIn = (username, password) => {
  let userList = JSON.parse(localStorage.getItem("user")) || [];
  let captionMsg  = document.getElementById("msg");
  for (let i in userList) {
    if (
      userList[i].username === username &&
      userList[i].password === password
    ) {
      console.log("Signed in successfully");
      return true;
    }
  }

  console.log("Invalid username or password");
  captionMsg.innerText = "Invalid username or password";
  return false;
};

export const validateName = (name) => name.match(/^[a-zA-z0-9]{4,12}/);

export const isValidPassword = (password) =>
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password);

export const isValidEmail = (email) =>
  email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export const isValidMobileNumber = (mobileNumber) => {
  if (mobileNumber != null) {
    var slicedpart = mobileNumber.slice(0, 3);
    var secondpart = Number(mobileNumber.slice(4));
  }
  return (
    mobileNumber != null &&
    !isNaN(secondpart) &&
    mobileNumber.length === 11 &&
    !mobileNumber.split("").some((x) => x === " ") &&
    (slicedpart === "010" ||
      slicedpart === "011" ||
      slicedpart === "012" ||
      slicedpart === "015")
  );
};
// export {
//   validateName,
//   isValidEmail,
//   isValidMobileNumber,
//   isValidPassword,
//   checkSignIn,
// };

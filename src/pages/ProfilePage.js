import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateLastName from "../validation/validateLastName.js";
import showToast from "../services/Toast.js";
import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import {checkZipCodeInput, checkHouseNumberInput, checPhoneInput, checkStateInput,checkCountryInput, checkCityInput, checkStreetInput} from "../validation/validateAdress.js";

const inputName = document.getElementById("profile-input-name");
const inputLastName = document.getElementById("profile-input-last-name");
const inputEmail = document.getElementById("profile-input-email");
const inputPassword = document.getElementById("profile-input-password");
const inputRePassword = document.getElementById("profile-input-repassword");
const btnProfile = document.querySelector("#profile-btn");
const checkboxIsAdmin = document.getElementById("check-is-admin2");
const profileCancelBtn = document.getElementById("profileCancelBtn");
const inputZipCode = document.getElementById("profile-input-zip-code");
const inputHouseNumber = document.getElementById("profile-input-house-number");
const inputPhone = document.getElementById("profile-input-phone");
const inputState = document.getElementById("profile-input-state");
const inputCountry = document.getElementById("profile-input-country");
const inputCity = document.getElementById("profile-input-city");
const inputStreet = document.getElementById("profile-input-street");

let nameOk = false;
let emailOk = false;
let passwordOk = false;
let repasswordOk = false;
let lastNameOk = false;

window.addEventListener("load", () => {
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let user = users.find((item) => item.id === token.id);
    if (user) {
      inputName.value = user.name;
      inputLastName.value = user.lastName;
      inputEmail.value = user.email;
      inputPassword.value = user.password;
      checkboxIsAdmin.checked = user.isAdmin;
    }
  }

  //when page loaded
  if (inputName.value !== "") {
    checkNameInput();
  }
  if (inputLastName.value !== "") {
    checkLastNameInput();
  }
  if (inputEmail.value !== "") {
    checkEmailInput();
  }
  if (inputPassword.value !== "") {
    checkPasswordInput();
  }
});

inputName.addEventListener("input", () => {
  checkNameInput();
});
inputLastName.addEventListener("input", () => {
  checkLastNameInput();
});

inputEmail.addEventListener("input", () => {
  checkEmailInput();
});

inputPassword.addEventListener("input", () => {
  checkPasswordInput();
});

inputRePassword.addEventListener("input", () => {
  checkRePasswordInput();
});
inputState.addEventListener("input", () => {
  checkStateInput();
});
inputCity.addEventListener("input", () => {
  checkCityInput();
});
inputCountry.addEventListener("input", () => {
  checkCountryInput();
});
inputStreet.addEventListener("input", () => {
  checkStreetInput();
});
inputZipCode.addEventListener("input", () => {
  checkZipCodeInput();
});
inputHouseNumber.addEventListener("input", () => {
  checkHouseNumberInput();
});
inputPhone.addEventListener("input", () => {
  checPhoneInput();
});
/*checkboxIsAdmin.addEventListener("click", () => {
    checkIsAdminCheckbox();
    
  });*/

const checkNameInput = () => {
  let errorArr = validateName(inputName.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById("profile-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById("profile-alert-name").classList.remove("d-none");
    document.getElementById("profile-alert-name").innerHTML =
      errorArr.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkLastNameInput = () => {
  let errorArr = validateLastName(inputLastName.value);
  //   console.log(reg.test(inputName.value));
  if (errorArr.length === 0) {
    //the text is ok
    inputLastName.classList.remove("is-invalid");
    document.getElementById("profile-alert-last-name").classList.add("d-none");
    lastNameOk = true;
  } else {
    //the text is not ok
    inputLastName.classList.add("is-invalid");
    document.getElementById("profile-alert-last-name").classList.remove("d-none");
    document.getElementById("profile-alert-last-name").innerHTML =
      errorArr.join("<br>");
    lastNameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputEmail.classList.remove("is-invalid");
    document.getElementById("profile-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    document.getElementById("profile-alert-email").classList.remove("d-none");
    document.getElementById("profile-alert-email").innerHTML =
      errorArr.join("<br>");
    emailOk = false;
  }
  checkIfCanEnableBtn();
};

const checkPasswordInput = () => {
  let errorArr = validatePassword(inputPassword.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputPassword.classList.remove("is-invalid");
    document.getElementById("profile-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("profile-alert-password")
      .classList.remove("d-none");
    document.getElementById("profile-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkRePasswordInput = () => {
  if(inputPassword.value != inputRePassword.value) { 
    inputRePassword.classList.add("is-invalid");
    document
      .getElementById("profile-alert-repassword")
      .classList.remove("d-none");
    document.getElementById("profile-alert-repassword").innerHTML =
      "Password does not match";
    repasswordOk = false;
  } else {
    inputRePassword.classList.remove("is-invalid");
    document.getElementById("profile-alert-repassword").classList.add("d-none");
    repasswordOk = true;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnProfile.disabled = !(nameOk && lastNameOk && emailOk && passwordOk && repasswordOk));
// 

btnProfile.addEventListener("click", () => {
  if (!(nameOk && emailOk && passwordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let token = localStorage.getItem("token");
  if (users && token) {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    token = JSON.parse(token);
    let userEmail = users.find((item) => item.email === inputEmail.value);
    let user = users.find((item) => item.id === token.id);
    if (userEmail && user.id !== userEmail.id) {
      //the email already token
      showToast("The email already taken", false);
      return;
    }
    if (user) {
      user.name = token.name = inputName.value;
      user.email = token.email = inputEmail.value;
      user.password = inputPassword.value;
      user.isAdmin = token.isAdmin = checkboxIsAdmin.checked;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("token", JSON.stringify(token));
      showToast("Saved");
    }
  }
  setTimeout(() => {
    location.reload();
  }, 3000);
});

profileCancelBtn.addEventListener("click", () => {
    handlePageChange(PAGES.HOME);
  });

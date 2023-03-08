import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";
import validateEmail from "../validation/validateEmail.js";
import validatePassword from "../validation/validatePassword.js";
import validateName from "../validation/validateName.js";
import validateLastName from "../validation/validateLastName.js";
import User from "../models/User.js";
import showToast from "../services/Toast.js";
import {checkZipCodeInput, checkHouseNumberInput, checPhoneInput, checkStateInput,checkCountryInput, checkCityInput, checkStreetInput} from "../validation/validateAdress.js";

const inputName = document.getElementById("register-input-name");
const inputLastName = document.getElementById("register-input-last-name");
const inputEmail = document.getElementById("register-input-email");
const inputPassword = document.getElementById("register-input-password");
const inputRePassword = document.getElementById("register-input-repassword");
const checkboxIsAdmin = document.getElementById("check-if-admin");
const btnRegister = document.querySelector("#register-btn");
const btnCancelRegister= document.querySelector("#registerCancelBtn");
const inputZipCode = document.getElementById("register-input-zip-code");
const inputHouseNumber = document.getElementById("register-input-house-number");
const inputPhone = document.getElementById("register-input-phone");
const inputState = document.getElementById("register-input-state");
const inputCountry = document.getElementById("register-input-country");
const inputCity = document.getElementById("register-input-city");
const inputStreet = document.getElementById("register-input-street");


let nameOk = false;
let lastnameOk = false;
let emailOk = false;
let passwordOk = false;
let repasswordOk = false;

window.addEventListener("load", () => {
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
  if (inputRePassword.value !== "") {
    checkRePasswordInput();
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
    checkIfAdminCheckbox();
  });*/

const checkNameInput = () => {
  let errorArr = validateName(inputName.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputName.classList.remove("is-invalid");
    document.getElementById("register-alert-name").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputName.classList.add("is-invalid");
    document.getElementById("register-alert-name").classList.remove("d-none");
    document.getElementById("register-alert-name").innerHTML =
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
    document.getElementById("register-alert-last-name").classList.add("d-none");
    lastnameOk = true;
  } else {
    //the text is not ok
    inputLastName.classList.add("is-invalid");
    document.getElementById("register-alert-last-name").classList.remove("d-none");
    document.getElementById("register-alert-last-name").innerHTML =
      errorArr.join("<br>");
    lastnameOk = false;
  }
  checkIfCanEnableBtn();
};

const checkEmailInput = () => {
  let errorArr = validateEmail(inputEmail.value);
  if (errorArr.length === 0) {
    //the text is ok
    inputEmail.classList.remove("is-invalid");
    document.getElementById("register-alert-email").classList.add("d-none");
    emailOk = true;
  } else {
    //the text is not ok
    inputEmail.classList.add("is-invalid");
    document.getElementById("register-alert-email").classList.remove("d-none");
    document.getElementById("register-alert-email").innerHTML =
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
    document.getElementById("register-alert-password").classList.add("d-none");
    passwordOk = true;
  } else {
    //the text is not ok
    inputPassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-password")
      .classList.remove("d-none");
    document.getElementById("register-alert-password").innerHTML =
      errorArr.join("<br>");
    passwordOk = false;
  }
  checkIfCanEnableBtn();
};

const checkRePasswordInput = () => {
  if(inputPassword.value != inputRePassword.value) { 
    inputRePassword.classList.add("is-invalid");
    document
      .getElementById("register-alert-repassword")
      .classList.remove("d-none");
    document.getElementById("register-alert-repassword").innerHTML =
      "Password does not match";
    repasswordOk = false;
  } else {
    inputRePassword.classList.remove("is-invalid");
    document.getElementById("register-alert-repassword").classList.add("d-none");
    repasswordOk = true;
  }
  checkIfCanEnableBtn();
};

const checkIfCanEnableBtn = () =>
  (btnRegister.disabled = !(nameOk && lastnameOk && emailOk && passwordOk && repasswordOk));

btnRegister.addEventListener("click", () => {
  if (!(nameOk && lastnameOk && emailOk && passwordOk)) {
    //if someone changed the html from dev tools
    return;
  }
  let users = localStorage.getItem("users");
  let nextUserId = localStorage.getItem("nextUserId");
  nextUserId = +nextUserId;
  let newUser = new User(
    nextUserId++,
    inputName.value,
    inputLastName.value,
    inputEmail.value,
    inputPassword.value,
    checkboxIsAdmin.checked
    
  );
  localStorage.setItem("nextUserId", nextUserId + "");
  if (!users) {
    //the first user
    users = [newUser];
    // let user = new User(inputName.value, inputEmail.value, inputPassword.value);
    // users = [user]
    localStorage.setItem("users", JSON.stringify(users));
    /*
      JSON.stringify(users) - convert array of objects to string
      localStorage.setItem - store the json string to localStorage with 
        key users 
        and value users as json string
    */
  } else {
    //we have users
    users = JSON.parse(users); // convert from string to array of objects
    // console.log("users from localStorage", users);
      for (let user of users) {
      if (user.email === inputEmail.value) {
        //display msg - email already exists
        showToast("Email already exists", false);
        return;
      }
    }
    //user provided new email
    users = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(users));
  }
  
  handlePageChange(PAGES.LOGIN);
});

btnCancelRegister.addEventListener("click", () => {
    handlePageChange(PAGES.HOME);
  });

import validate from "./validate.js";

const inputZipCode = document.getElementById("register-input-zip-code");
const inputHouseNumber = document.getElementById("register-input-house-number");
const inputPhone = document.getElementById("register-input-phone");
const inputState = document.getElementById("register-input-state");
const inputCountry = document.getElementById("register-input-country");
const inputCity = document.getElementById("register-input-city");
const inputStreet = document.getElementById("register-input-street");

const validateZipCode = (value) => {
  const regZipCode = new RegExp("^[0-9]+$", "g");
  return validate(regZipCode, value, 0, 10).map((err) => `Zip Code is ${err}`);
};

const checkZipCodeInput = () => {
  let errorArr = validateZipCode(inputZipCode.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputZipCode.classList.remove("is-invalid");
    document.getElementById("register-alert-zip-code").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputZipCode.classList.add("is-invalid");
    document.getElementById("register-alert-zip-code").classList.remove("d-none");
    document.getElementById("register-alert-zip-code").innerHTML =
      errorArr.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};
const validateHouseNumber = (value) => {
  const regHouseNumber = new RegExp("^[0-9]+$", "gi");
  return validate(regHouseNumber, value, 0, 10).map((err) => `House Number is ${err}`);
};

const checkHouseNumberInput = () => {
  let errorArr = validateHouseNumber(inputHouseNumber.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputHouseNumber.classList.remove("is-invalid");
    document.getElementById("register-alert-house-number").classList.add("d-none");
    nameOk = true;
  } else {
    //the text is not ok
    inputHouseNumber.classList.add("is-invalid");
    document.getElementById("register-alert-house-number").classList.remove("d-none");
    document.getElementById("register-alert-house-number").innerHTML =
      errorArr.join("<br>");
    nameOk = false;
  }
  checkIfCanEnableBtn();
};

const validatePhone = (value) => {
  const regPhone= new RegExp("^[0-9]+$", "gi");
  return validate(regPhone, value, 0, 10).map((err) => `Phone is ${err}`);
};

const checPhoneInput = () => {
  let errorArr = validatePhone(inputPhone.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputPhone.classList.remove("is-invalid");
    document.getElementById("register-alert-phone").classList.add("d-none");
  } else {
    //the text is not ok
    inputPhone.classList.add("is-invalid");
    document.getElementById("register-alert-phone").classList.remove("d-none");
    document.getElementById("register-alert-phone").innerHTML =
      errorArr.join("<br>");
  }
  checkIfCanEnableBtn();
};
const validateState = (value) => {
  const regState = new RegExp("^[A-Za-z]+$", "gi");
  return validate(regState, value, 0, 255).map((err) => `State is ${err}`);
};
const checkStateInput = () => {
  let errorArr = validateState(inputState.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputState.classList.remove("is-invalid");
    document.getElementById("register-alert-state").classList.add("d-none");
  } else {
    //the text is not ok
    inputState.classList.add("is-invalid");
    document.getElementById("register-alert-state").classList.remove("d-none");
    document.getElementById("register-alert-state").innerHTML =
      errorArr.join("<br>");
  }
  checkIfCanEnableBtn();
};

const validateCountry = (value) => {
  const regCountry = new RegExp("^[A-Za-z]+$", "gi");
  return validate(regCountry, value, 0, 255).map((err) => `Country is ${err}`);
};

const checkCountryInput = () => {
  let errorArr = validateCountry(inputCountry.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputCountry.classList.remove("is-invalid");
    document.getElementById("register-alert-country").classList.add("d-none");
  } else {
    //the text is not ok
    inputCountry.classList.add("is-invalid");
    document.getElementById("register-alert-country").classList.remove("d-none");
    document.getElementById("register-alert-country").innerHTML =
      errorArr.join("<br>");
  }
  checkIfCanEnableBtn();
};

const validateCity = (value) => {
  const regCity = new RegExp("[a-zA-Z]+(\\,)?", "gi");
  return validate(regCity, value, 0, 255).map((err) => `City is ${err}`);
};
const checkCityInput = () => {
  let errorArr = validateCity(inputCity.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputCity.classList.remove("is-invalid");
    document.getElementById("register-alert-city").classList.add("d-none");
  } else {
    //the text is not ok
    inputCity.classList.add("is-invalid");
    document.getElementById("register-alert-city").classList.remove("d-none");
    document.getElementById("register-alert-city").innerHTML =
      errorArr.join("<br>");
  }
  checkIfCanEnableBtn();
};

const validateStreet = (value) => {
  const regStreet = new RegExp("[a-zA-Z0-9\\s]+(\\,)?", "gi");
  return validate(regStreet, value, 0, 255).map((err) => `Street is ${err}`);
};
const checkStreetInput = () => {
  let errorArr = validateStreet(inputStreet.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    inputStreet.classList.remove("is-invalid");
    document.getElementById("register-alert-street").classList.add("d-none");
  } else {
    //the text is not ok
    inputStreet.classList.add("is-invalid");
    document.getElementById("register-alert-street").classList.remove("d-none");
    document.getElementById("register-alert-street").innerHTML =
      errorArr.join("<br>");
  }
  checkIfCanEnableBtn();
};


export {checkZipCodeInput, checkHouseNumberInput, checPhoneInput, checkStateInput,checkCountryInput, checkCityInput, checkStreetInput};








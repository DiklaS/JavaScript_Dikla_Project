import validate from "./validate.js";




const validateUrl = (value) => {
  const regUrl = new RegExp("^((http|https)://)[-a-zA-Z0-9@:%.\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%.\\+~#?&//=]*)$", "gi");
  return validate(regUrl, value, 5, 3255).map((err) => `Img URL is ${err}`);
};

const checkUrlInput = () => {
  let errorArr = validateUrl(editPropertiesPopupImg.value);
  if (errorArr.length === 0) {
    //the text is ok
    editPropertiesPopupImg.classList.remove("is-invalid");
    document.getElementById("validationImgFeedback").classList.add("d-none");
    
  } else {
    //the text is not ok
    editPropertiesPopupImg.classList.add("is-invalid");
    document.getElementById("validationImgFeedback").classList.remove("d-none");
    document.getElementById("validationImgFeedback").innerHTML =
    errorArr.join("<br>");
    
  }
  //checkIfCanEnableBtn();
};


const validateAlt = (value) => {
  const regAlt = new RegExp("^[A-Za-z]+$", "gi");
  return validate(regAlt, value, 2, 255).map((err) => `Alt is ${err}`);
};

const checkAltInput = () => {
  let errorArr = validateAlt(editPropertiesPopupAlt.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    editPropertiesPopupAlt.classList.remove("is-invalid");
    document.getElementById("validationAltFeedback").classList.add("d-none");
    
  } else {
    //the text is not ok
    editPropertiesPopupAlt.classList.add("is-invalid");
    document.getElementById("validationAltFeedback").classList.remove("d-none");
    document.getElementById("validationAltFeedback").innerHTML =
    errorArr.join("<br>");
    
  }
  //checkIfCanEnableBtn();
};


const validateCredit = (value) => {
  const regCredit = new RegExp("^[A-Za-z ]+$", "gi");
  return validate(regCredit, value, 2, 255).map((err) => `Credit is ${err}`);
};

const checkCreditInput = () => {
  let errorArr = validateCredit(editPropertiesPopupCredit.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    editPropertiesPopupCredit.classList.remove("is-invalid");
    document.getElementById("validationCreditFeedback").classList.add("d-none");
    
  } else {
    //the text is not ok
    editPropertiesPopupCredit.classList.add("is-invalid");
    document.getElementById("validationCreditFeedback").classList.remove("d-none");
    document.getElementById("validationCreditFeedback").innerHTML =
      errorArr.join("<br>");
    
  }
  //checkIfCanEnableBtn();
};

const validatePrice = (value) => {
  const regPrice = new RegExp("^[0-9]+$", "gi");
  return validate(regPrice, value, 1, 255).map((err) => `Price is ${err}`);
};

const checkPriceInput = () => {
  let errorArr = validatePrice(editPropertiesPopupPrice.value);
  
  if (errorArr.length === 0) {
    //the text is ok
    editPropertiesPopupPrice.classList.remove("is-invalid");
    document.getElementById("validationPriceFeedback").classList.add("d-none");
    
  } else {
    //the text is not ok
    editPropertiesPopupPrice.classList.add("is-invalid");
    document.getElementById("validationPriceFeedback").classList.remove("d-none");
    document.getElementById("validationPriceFeedback").innerHTML =
      errorArr.join("<br>");
    
  }
  //checkIfCanEnableBtn();
};


export {checkUrlInput, checkAltInput, checkCreditInput, checkPriceInput};






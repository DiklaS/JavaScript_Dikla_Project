import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";
import { checkUrlInput, checkAltInput, checkPriceInput, checkCreditInput } from "../validation/validateEditForm.js";


let selectedProperty, editProperty;
const editPropertiesPopupImgDisplay = document.getElementById("editPropertiesPopupImgDisplay");
const editPropertiesPopupName = document.getElementById("editPropertiesPopupName");
const editPropertiesPopupDescription = document.getElementById("editPropertiesPopupDescription");
const editPropertiesPopupPrice = document.getElementById("editPropertiesPopupPrice");
const editPropertiesPopupImg = document.getElementById("editPropertiesPopupImg");
const editPropertiesPopupAlt = document.getElementById("editPropertiesPopupAlt");
const editPropertiesPopupCredit = document.getElementById("editPropertiesPopupCredit");

const editPropertiesPopup = document.getElementById("editPropertiesPopup");



const initPopup = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
    document.getElementById("editFormTiTle").innerHTML = "Edit Picture Form";
  } else {
    selectedProperty = new Property(getNextId(), "", "", "", "", "", "");
    document.getElementById("editFormTiTle").innerHTML = "Create Picture Form";
  }
  editProperty = editPropertyFromHomePage;
  editPropertiesPopupImgDisplay.src = selectedProperty.imgUrl;
  editPropertiesPopupName.value = selectedProperty.name;
  //editPropertiesPopupDescription.value = selectedProperty.description;
  editPropertiesPopupPrice.value = selectedProperty.price;
  editPropertiesPopupImg.value = selectedProperty.imgUrl;
  editPropertiesPopupAlt.value = selectedProperty.alt;
  editPropertiesPopupCredit.value = selectedProperty.credit;
  showPopup();
};


const showPopup = () => {
  editPropertiesPopup.classList.remove("d-none");
};

const hidePopup = () => {
  editPropertiesPopup.classList.add("d-none");
};

editPropertiesPopupImg.addEventListener("input", () => {
  checkUrlInput();
});
editPropertiesPopupAlt.addEventListener("input", () => {
  checkAltInput();
});
editPropertiesPopupCredit.addEventListener("input", () => {
  checkCreditInput();
});
editPropertiesPopupPrice.addEventListener("input", () => {
  checkPriceInput();
});

window.addEventListener("load", () => {
  editPropertiesPopup.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "editPropertiesPopup" &&
      ev.target.id !== "editPropertiesPopupCancelBtn" &&
      ev.target.id !== "editPropertiesPopupCancelBtnIcon"
    ) {
      return;
    }
    hidePopup();
  });
  document
    .getElementById("editPropertiesPopupSaveBtn")
    .addEventListener("click", () => {
      selectedProperty.name = editPropertiesPopupName.value;
      //selectedProperty.description = editPropertiesPopupDescription.value;
      selectedProperty.price = editPropertiesPopupPrice.value;
      selectedProperty.imgUrl = editPropertiesPopupImg.value;
      selectedProperty.alt = editPropertiesPopupAlt.value;
      selectedProperty.credit = editPropertiesPopupCredit.value;
      editProperty(selectedProperty);
      hidePopup();
    });
  editPropertiesPopupImg.addEventListener("input", () => {
    editPropertiesPopupImgDisplay.src = editPropertiesPopupImg.value;
  });
});

export { initPopup, showPopup, hidePopup };




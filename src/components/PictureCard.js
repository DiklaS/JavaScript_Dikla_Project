import Property from "../models/Property.js";
import getNextId from "../utils/getNextId.js";
//import {checkUrlInput, checkAltInput, checkPriceInput, checkCreditInput} from "../validation/validateEditForm.js";

let selectedProperty, editProperty;
const pictureDetailsCardImg = document.getElementById("pictureDetailsCardImg");
const pictureDetailsCardName = document.getElementById("pictureDetailsCardName");
const pictureDetailsCardDescription = document.getElementById("pictureDetailsCardDescription");
const pictureDetailsCardId = document.getElementById("pictureDetailsCardId");
const inputUrl = document.getElementById("register-input-street");


const pictureDetailsCard = document.getElementById("pictureDetailsCard");

const initPictureCard = (selectedPropertyFromHomePage, editPropertyFromHomePage) => {
  /*
    set data from selectedProperty to html
    */
  if (selectedPropertyFromHomePage) {
  selectedProperty = selectedPropertyFromHomePage;
  }
  editProperty = editPropertyFromHomePage;
  pictureDetailsCardImg.src = selectedProperty.imgUrl;
  document.getElementById("pictureDetailsCardName").innerHTML = selectedProperty.name;
  document.getElementById("pictureDetailsCardDescription").innerHTML = selectedProperty.description;
  document.getElementById("pictureDetailsCardCreatedAt").innerHTML = "Created At: " + selectedProperty.createdAt;
  document.getElementById("pictureDetailsCardId").innerHTML = "Picture ID: " + selectedProperty.id;
  showPictureCard();
};

const showPictureCard = () => {
  pictureDetailsCard.classList.remove("d-none");
};

const hidePictureCard = () => {
  pictureDetailsCard.classList.add("d-none");
};

window.addEventListener("load", () => {
  pictureDetailsCard.addEventListener("click", (ev) => {
    if (
      ev.target.id !== "pictureDetailsCard" &&
      ev.target.id !== "pictureCardCloseBtn" 
    ) {
      return;
    }
    hidePictureCard();
  });
  /*document
    .getElementById("editPropertiesPopupSaveBtn")
    .addEventListener("click", () => {
      selectedProperty.name = editPropertiesPopupName.value;
      //selectedProperty.description = editPropertiesPopupDescription.value;
      selectedProperty.price = editPropertiesPopupPrice.value;
      selectedProperty.imgUrl = editPropertiesPopupImg.value;
      selectedProperty.alt= editPropertiesPopupAlt.value;
      selectedProperty.credit= editPropertiesPopupCredit.value;
      editProperty(selectedProperty);
      hidePopup();
    });
  editPropertiesPopupImg.addEventListener("input", () => {
    editPropertiesPopupImgDisplay.src = editPropertiesPopupImg.value;
  });*/
});






export { initPictureCard, showPictureCard, hidePictureCard };

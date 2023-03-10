import {
  initialPropertiesGallery,
  updatePropertiesGallery,
} from "../components/PropertiesGallery.js";
import {
  initialPicturesList,
  updatePicturesList,
} from "../components/PicturesList.js";
import {
  initialPicturesCarousel,
  updatePicturesCarousel,
} from "../components/PicturesCarousel.js";
import { initPopup } from "../components/Popup.js";
import {initialFavoritesPropertiesGallery, initFavorite} from "../pages/FavoritesPage.js";
import { initPictureCard } from "../components/PictureCard.js";
import checkIfAdmin from "../utils/checkIfAdmin.js";



let propertiesArr, originalPropertiesArr, favoritesArr;
let displayNow; // display that we can see now 

/* btns */
let homeDisplayList;
let homeDisplayGallery;
let homeDisplayCarousel;
/* displays */
let propertiesGallery;
let propertiesList;
let propertiesCarousel;
let isAdmin;
let favoritesPropertiesGallery;

window.addEventListener("load", () => {
  propertiesArr = localStorage.getItem("props");
  //favoritesArr =  JSON.parse(localStorage.getItem("favorites"));
  if (!propertiesArr) {
    return;
  }
  propertiesArr = JSON.parse(propertiesArr);
  originalPropertiesArr = [...propertiesArr];
  isAdmin = checkIfAdmin();
  //passing propertiesArr to PropertiesGallery.js
  initialPropertiesGallery(propertiesArr, isAdmin, deleteProperty, showPopup, showPictureCard, saveFavorite);
  initialPicturesList(propertiesArr, isAdmin, deleteProperty, showPopup);
  initialPicturesCarousel(propertiesArr);
  //initialFavoritesPropertiesGallery(favoritesArr);
  initializeElements();
  initializeBtns();
});

const initializeElements = () => {
  /* btns */
  homeDisplayList = document.getElementById("homeDisplayList");
  homeDisplayGallery = document.getElementById("homeDisplayGallery");
  homeDisplayCarousel = document.getElementById("homeDisplayCarousel");
  //favoritesDisplay = document.getElementById("nav-my-favorites-page");
  /* divs */
  propertiesGallery = document.getElementById("propertiesGallery");
  propertiesList = document.getElementById("propertiesList");
  propertiesCarousel = document.getElementById("propertiesCarousel");
  favoritesPropertiesGallery = document.getElementById("favorites-page");
  displayNow = propertiesCarousel; // choose who we want to display
  displayToDisplay(displayNow);
};

const initializeBtns = () => {
  homeDisplayList.addEventListener("click", () => {
    displayToDisplay(propertiesList);
  });
  homeDisplayGallery.addEventListener("click", () => {
    displayToDisplay(propertiesGallery);
  });
  homeDisplayCarousel.addEventListener("click", () => {
    displayToDisplay(propertiesCarousel);
  });
  /*favoritesDisplay.addEventListener("click", () => {
    displayToDisplay(favoritesPropertiesGallery);
  });*/
  document
    .getElementById("homeDisplaySortASC")
    .addEventListener("click", () => {
      sortPropertys();
    });
  document
    .getElementById("homeDisplaySortDESC")
    .addEventListener("click", () => {
      sortPropertys(false);
    });
  document
    .getElementById("homeDisplaySearch")
    .addEventListener("input", (ev) => {
      let regex = new RegExp("^" + ev.target.value, "i");
      propertiesArr = originalPropertiesArr.filter((item) => {
        let reg = regex.test(item.name);

        return reg;
      });
      updateDisplays();
    });
};

const displayToDisplay = (toDisplay) => {
  // hide what we currently showing
  displayNow.classList.remove("d-block");
  displayNow.classList.add("d-none");
  // show what we want to display now
  toDisplay.classList.remove("d-none");
  toDisplay.classList.add("d-block");
  //this is what we displaying now
  displayNow = toDisplay;
};

const updateDisplays = () => {
  updatePropertiesGallery(propertiesArr); // update gallery
  updatePicturesList(propertiesArr); // update list
  updatePicturesCarousel(propertiesArr); // update carousel
  //updateFavoritesPropertiesGallery(favoritesArr);
};

const saveToLocalStorage = (arrToSave) => {
  localStorage.setItem("props", JSON.stringify(arrToSave));
};

const deleteProperty = (id) => {
  id = +id; //convert string to number
  originalPropertiesArr = originalPropertiesArr.filter(
    (item) => item.id !== id
  );
  saveToLocalStorage(originalPropertiesArr);
  propertiesArr = propertiesArr.filter((item) => item.id !== id); //delete property by index
  updateDisplays();
};

const sortPropertys = (asc = true) => {
  if (asc) {
    // from a to z
    propertiesArr.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // from z to a
    propertiesArr.sort((a, b) => b.name.localeCompare(a.name));
  }
  updateDisplays();
};

const showPopup = (id) => {
  let selectedProperty = propertiesArr.find((item) => item.id === +id);
  if (!selectedProperty) {
    return;
  }
  initPopup(selectedProperty, editProperty);
};

const saveFavorite = (id) => {
  let selectedProperty = propertiesArr.find((item) => item.id === +id);
  if (!selectedProperty) {
    return;
  }
  initFavorite(selectedProperty);
  
};

const showNewPopup = () => {
  initPopup(undefined, addNewProperty);
};

const showPictureCard = (id) => {
  let selectedProperty = propertiesArr.find((item) => item.id === +id);
  if (!selectedProperty) {
    return;
  }
  initPictureCard(selectedProperty, editProperty);
};

const addNewProperty = (newProperty) => {
  originalPropertiesArr = [...originalPropertiesArr, newProperty];
  let nextId = +newProperty.id + 1;
  localStorage.setItem("nextid", nextId + "");
  propertiesArr = [...originalPropertiesArr];
  editProperty();
};

const editProperty = () => {
  saveToLocalStorage(originalPropertiesArr);
  updateDisplays(); // update html
};


export { showNewPopup };

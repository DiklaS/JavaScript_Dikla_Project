let propertiesArr;
let galleryDiv;
let isAdmin;
let deleteProperty;
let showPopup;
let showPictureCard;
let saveFavorite;

//this function will transfer data from homepage to this page
const initialPropertiesGallery = ( 
  propertiesArrFromHomePage,
  isAdminParam,
  deletePropertyFromHomePage,
  showPopupFromHomePage,
  showPictureCardFromHomePage,
  saveFavoriteFromHomePage,
) => { 
  galleryDiv = document.getElementById("home-page-properties-gallery");
  isAdmin = isAdminParam;
  deleteProperty = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;
  showPictureCard = showPictureCardFromHomePage;
  saveFavorite = saveFavoriteFromHomePage;
  updatePropertiesGallery(propertiesArrFromHomePage);
};

const updatePropertiesGallery = (propertiesArrFromHomePage) => {
  /*
    this function will get data from homepage and create new gallery.
    if the gallery already exists it will remove the old one and
    create new one
  */
  propertiesArr = propertiesArrFromHomePage;
  createGallery();
};

const createCard = (name, credit, price, img, id) => {
  const adminBtns = `
  <button type="button" class="btn btn-warning" id="propertyGalleryEditBtn-${id}">
    <i class="bi bi-pen-fill"></i> Edit
  </button>
  <button type="button" class="btn btn-danger" id="propertyGalleryDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i> Delete
  </button>
  `;
  return `
  <div class="col">
    <div class="card h-100 ">
      <img
        src="${img}"
        class="card-img-top"
        alt="${name}"
        id="propertyGalleryImgBtn-${id}"
      />
      <div class="card-body ">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">
          Credit: ${credit}
        </p>
      </div>
      <ul class="list-group list-group-flush ">
        <li class="list-group-item">Price: ${price} NIS<button type="button" class="btn" id="propertyFavoriteBtn-${id}"><i class="bi bi-cart2 ms-5"></i></button>
        </li>
      </ul>
      <div class="card-body">
        <button type="button" class="btn btn-success">
          <i class="bi bi-currency-dollar"></i> Buy now
        </button>
        ${isAdmin ? adminBtns : ""}
      </div>
    </div>
  </div>
  `;
};
const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-"); // split the id to array
  if (!ev.target.id) {
    /*
        if press on icon then there is no id
        then we need to take the id of the parent which is btn
      */
    idFromId = ev.target.parentElement.id.split("-");
  }
  
  return idFromId[1];
};

const handleDeleteBtnClick = (ev) => {
  deleteProperty(getIdFromClick(ev));
};

const handleEditBtnClick = (ev) => {
  showPopup(getIdFromClick(ev));
};

const handleImgBtnClick = (ev) => {
  showPictureCard(getIdFromClick(ev));
};

const handleFavoriteBtnClick = (ev) => {
  saveFavorite(getIdFromClick(ev));
};

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};
const createGallery = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  clearEventListeners("propertyGalleryDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
  clearEventListeners("propertyGalleryEditBtn", handleEditBtnClick);
  //clear event listeners for img btns
  clearEventListeners("propertyGalleryImgBtn", handleImgBtnClick);
  clearEventListeners("propertyFavoriteBtn", handleFavoriteBtnClick);

  //create new elements and remove old ones
  for (let property of propertiesArr) {
    innerStr += createCard(
      property.name,
      property.credit,
      property.price,
      property.imgUrl,
      property.id
    );
  }
  galleryDiv.innerHTML = innerStr;
  // add event listeners for delete btns
  createBtnEventListener("propertyGalleryDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("propertyGalleryEditBtn", handleEditBtnClick);
  // add event listeners for img btns
  createBtnEventListener("propertyGalleryImgBtn", handleImgBtnClick);
  createBtnEventListener("propertyFavoriteBtn", handleFavoriteBtnClick);
};
//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};


export { initialPropertiesGallery, updatePropertiesGallery };

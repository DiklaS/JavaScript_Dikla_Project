let propertiesArr;
let listDiv;
let isAdmin;
let deleteProperty;
let showPopup;
//this function will transfer data from homepage to this page
const initialPicturesList = (
  propertiesArrFromHomePage,
  isAdminParam,
  deletePropertyFromHomePage,
  showPopupFromHomePage
) => {
  listDiv = document.getElementById("home-page-properties-list");
  isAdmin = isAdminParam;
  deleteProperty = deletePropertyFromHomePage;
  showPopup = showPopupFromHomePage;
  updatePicturesList(propertiesArrFromHomePage);
};

const updatePicturesList = (propertiesArrFromHomePage) => {
  /*
    this function will get data from homepage and create new list.
    if the list already exists it will remove the old one and
    create new one
  */
  propertiesArr = propertiesArrFromHomePage;
  createList();
};

const createItem = (id, imgUrl, name, credit) => {
  
  const EditBtns = `
  <button type="button" class="btn btn-warning w-100" id="propertyListEditBtn-${id}">
    <i class="bi bi-pen-fill"></i>
  </button>`;
  const DeleteBtns = `
  <button type="button" class="btn btn-danger w-100" id="propertyListDeleteBtn-${id}">
    <i class="bi bi-x-circle-fill"></i>
  </button>
  `;
  return `
  
    <tr>
      <td>${id}</td>
      <td><img src="${imgUrl}" alt="${name}" id="table-property-img"/></td>
      <td>${imgUrl}</td>
      <td>${name}</td>
      <td>${credit}</td>
      <td><button type="button" class="btn btn-success w-100">
    <i class="bi bi-currency-dollar"></i> 
  </button></td>
      <td>${isAdmin ? EditBtns : ""}</td>
      <td>${isAdmin ? DeleteBtns : ""}</td>
    </tr>
  
  `;
};

const getIdFromClick = (ev) => {
  let idFromId = ev.target.id.split("-"); // split the id to array
  console.log(idFromId)
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

const clearEventListeners = (idKeyword, handleFunction) => {
  //get all old btns
  let btnsBefore = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //remove old events
  for (let btn of btnsBefore) {
    btn.removeEventListener("click", handleFunction);
  }
};

const createList = () => {
  let innerStr = "";
  //clear event listeners for delete btns
  clearEventListeners("propertyListDeleteBtn", handleDeleteBtnClick);
  //clear event listeners for edit btns
  clearEventListeners("propertyListEditBtn", handleEditBtnClick);

  //create new elements and remove old ones
  for (let property of propertiesArr) {
    innerStr += createItem(
      property.id,
      property.imgUrl,
      property.name,
      property.credit,
    );
  }
  listDiv.innerHTML = innerStr;
  // add event listeners for delete btns
  createBtnEventListener("propertyListDeleteBtn", handleDeleteBtnClick);
  // add event listeners for edit btns
  createBtnEventListener("propertyListEditBtn", handleEditBtnClick);
};

//Creates event listener for the delete buttons
const createBtnEventListener = (idKeyword, handleFunction) => {
  let btns = document.querySelectorAll(`[id^='${idKeyword}-']`);
  //add events to new btns
  for (let btn of btns) {
    btn.addEventListener("click", handleFunction);
  }
};

export { initialPicturesList, updatePicturesList };

import showToast from "../services/Toast.js";

let favoritesArr;
let favoritesGalleryDiv;
let selectedProperty;

window.addEventListener("load", () => {
  
  favoritesArr =  JSON.parse(localStorage.getItem("favorites"));
  if (!favoritesArr) {
    return;
  }
  initialFavoritesPropertiesGallery(favoritesArr);
});

const initialFavoritesPropertiesGallery = ( 
  favoritesArrFromHomePage
) => { 
  favoritesGalleryDiv = document.getElementById("favorites-properties-gallery");
  updateFavoritesPropertiesGallery(favoritesArrFromHomePage);
};

const updateFavoritesPropertiesGallery = (favoritesArrFromHomePage) => {
  favoritesArr = favoritesArrFromHomePage;
  createFavoritesGallery();
};


const createCard = (name, id, price, description, imgUrl, credit, createdAt ) => {
  return `
  <div class="col">
    <div class="card h-100 ">
      <img
        src="${imgUrl}"
        class="card-img-top"
        alt="${name}"
      />
      <div class="card-body ">
        <h5 class="card-title">${name}</h5>
        <p>${description}</p>
      </div>
      <ul class="list-group list-group-flush ">
        <li class="list-group-item">Price: ${price}</li>
        <li class="list-group-item">Id: ${id}</li>
        <li class="list-group-item">Credit: ${credit}</li>
        <li class="list-group-item">Create At: ${createdAt}</li>
      </ul>
    </div>
  </div>
  `;
};

const createFavoritesGallery = () => {
  let innerStr = "";
  for (let property of favoritesArr) {
    innerStr += createCard(
      property.name,
      property.id,
      property.price,
      property.description,
      property.imgUrl,
      property.credit,
      property.createdAt,
    );
  }
  favoritesGalleryDiv.innerHTML = innerStr;
  
};

const initFavorite = (selectedPropertyFromHomePage) => {
  let token = JSON.parse(localStorage.getItem("token"));  
  if (!token) {
      return;
    }
    if (selectedPropertyFromHomePage) {
    selectedProperty = selectedPropertyFromHomePage;
    }
    let favorites = localStorage.getItem("favorites");
    let nextFavoriteId = localStorage.getItem("nextFavoriteId");
    nextFavoriteId = +nextFavoriteId;
    let newFavorite = {
        name: selectedProperty.name,
        id: selectedProperty.id,
        price: selectedProperty.price,
        description: selectedProperty.description,
        imgUrl:selectedProperty.imgUrl,
        credit: selectedProperty.credit,
        createdAt: selectedProperty.createdAt,
        
        };
    localStorage.setItem("nextFavoriteId", nextFavoriteId + "");
    if (!favorites) {
    favorites = [newFavorite];  
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    } else {
    favorites = JSON.parse(favorites); 
        for (let favorite of favorites) {
            if (favorite.id === newFavorite.id) {
              return;
            } 
         }
    favorites = [...favorites, newFavorite];
    
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    };
  favoritesArr =  JSON.parse(localStorage.getItem("favorites"));
  initialFavoritesPropertiesGallery(favoritesArr);
};

export {initialFavoritesPropertiesGallery, initFavorite} ;


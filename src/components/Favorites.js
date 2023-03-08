
//import {createCard} from "../components/Favorites.js"
let selectedProperty;

const initFavorite = (selectedPropertyFromHomePage, saveFavoriteFromHomePage) => {
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
  
  //createCard()
  
};

export { initFavorite} ;




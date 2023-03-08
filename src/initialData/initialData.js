import Property from "../models/Property.js";
import User from "../models/User.js";

let id = 1;
let nextUserId = 1;
let nextFavoriteId = 1;

const createData = () => {
  let propertiesArr = [
    new Property(
      id++,
      "Owl",
      '200',
      `This painting is among Rotem's first paintings.`,
      "./assets/imgs/1.jpg",
      "Owl",
      "Rotem Shaked",
      "03.09.2021",
    ),
    new Property(
      id++,
      "Parrot",
      '50',
      `A colorful and happy painting.`,
      "./assets/imgs/2.jpg",
      "Parrot",
      "Rotem Shaked",
      "04.05.2022",
    ),
    new Property(
      id++,
      "Ballerina",
      '75',
      `Deep painting, relaxing and with movement.`,
      "./assets/imgs/3.jpg",
      "Ballerina",
      "Rotem Shaked",
      "14.06.2022",
    ),
    new Property(
      id++,
      "Guitar",
      '400',
      `Final project of a drawing class. The painting with acrylic paints on canvas`,
      "./assets/imgs/4.jpg",
      "Guitar",
      "Rotem Shaked",
      "04.04.2022",
    ),
    new Property(
      id++,
      "Road Safety",
      '50',
      `This painting was done as part of a competition at school on the subject of road safety.`,
      "./assets/imgs/5.jpg",
      "Road Safety",
      "Rotem Shaked",
      "18.01.2023",
    ),
    new Property(
      id++,
      "Bridge",
      '60',
      `A view of the bridge and the river.`,
      "./assets/imgs/6.jpg",
      "Bridge",
      "Rotem Shaked",
      "18.03.2022",
    ),
  ];
  return propertiesArr;
};

const createUsersData = () => {
  let UsersArr = [
    new User(
      nextUserId++,
      "Moshe",
      "Efroni",
      "moshe@org.il",
      "MMmm22@@",
      false
    ),
    new User(
      nextUserId++,
      "Inbal",
      "Levi",
      "inbal@org.il",
      "IIii22@@",
      true
    ),
  ];
  return UsersArr;
};

const setInitialData = () => {
  let properties = localStorage.getItem("props");
  if (properties) {
    return;
  }
  let users = localStorage.getItem("users");
  if (users) {
    return;
  }
  localStorage.setItem("props", JSON.stringify(createData()));
  localStorage.setItem("users", JSON.stringify(createUsersData()));
  localStorage.setItem("nextid", id + "");
  localStorage.setItem("nextUserId", nextUserId + "");
  localStorage.setItem("nextFavoriteId", nextFavoriteId + "");
};

setInitialData();

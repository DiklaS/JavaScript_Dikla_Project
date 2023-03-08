class Property {
  id;
  name;
  price;
  description;
  imgUrl;
  alt;
  credit;
  createdAt;
  constructor(id, name, price, description, imgUrl, alt, credit, createdAt) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imgUrl = imgUrl;
    this.alt = alt;
    this.credit = credit;
    this.createdAt = createdAt;
  }
}
export default Property;

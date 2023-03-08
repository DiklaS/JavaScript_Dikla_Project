class User {
  id;
  name;
  lastName;
  email;
  password;
  isAdmin;
  constructor(id, name, lastName, email, password, isAdmin) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.id = id;
  }
}
export default User;

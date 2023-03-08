const checkIfConnected = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    localStorage.removeItem('favorites');
    return false;
  }
  token = JSON.parse(token);
  return !!token; //convert to boolean
};

export default checkIfConnected;

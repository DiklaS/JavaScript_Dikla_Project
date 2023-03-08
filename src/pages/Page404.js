import PAGES from "../models/pageModel.js";
import { handlePageChange } from "../routes/router.js";

const homeLink = document.getElementById("link-to-home");
/*const NotFoundPage = () => {
    return <></> 
}*/
homeLink.addEventListener("click", () => {
    handlePageChange(PAGES.HOME);
  });

//export default NotFoundPage
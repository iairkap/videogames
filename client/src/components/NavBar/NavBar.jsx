//quiero que la navbar tenga acceso a la home y a la pagina de creacion de producto

import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/searchBar";

const NavBar = () => {
  return (
    <div className={style.mainConatiner}>
      <Link to="/home ">HOME</Link>
      <SearchBar />
      <Link to="/create">FORM</Link>
    </div>
  );
};

export default NavBar;

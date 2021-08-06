import React,{useContext} from "react";
//import axios from "axios";
//import cookie from "js-cookie";
import Auth from "../context/Auth";
import{ logout } from "../services/AuthApi"
const Logout = () => {
 const {setIsAuthenticated} = useContext(Auth)

  const disconnect = () => {
     logout()
     setIsAuthenticated(false)   
  };

  return (
    <li onClick={disconnect}>
      <img src="./img/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
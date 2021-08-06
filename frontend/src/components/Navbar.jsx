import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import './style/navbar.scss';
import Logout from "./Logout";
import Auth from "../context/Auth";

const Navbar = () => {
    const { isAuthenticated }= useContext(Auth)

    return(
        <nav className="container-navbar">
            <div className="container-navbar_logo">
                <NavLink exact to="/">
                    <div className="container-navbar_logo_picture">
                        <img className="container-navbar_logo_picture_img" src="./img/logo.png" alt="icon" />
                    </div>
                </NavLink>

            </div>
            { (isAuthenticated) ?(
                <ul className="container-navbar_iconconnection">
                    <li className="container-navbar_iconconnection_li">
                        <NavLink exact to="/account" className="container-navbar_iconconnection_li_link">
                            Mon compte
                        </NavLink>    
                    </li>
                    <li className="container-navbar_iconconnection_li">
                        <NavLink exact to="/posts" className="container-navbar_iconconnection_li_link">
                            Posts
                        </NavLink>    
                    </li>
                    
                       <Logout />
                    
                  
                </ul>
            ):(
                <ul className="container-navbar_iconconnection">
                     <li className="container-navbar_iconconnection_li">
                        <NavLink exact to="/login" className="container-navbar_iconconnection_li_link">
                            Connection
                        </NavLink>    
                    </li>
                    <li className="container-navbar_iconconnection_li">
                        <NavLink exact to="/register" className="container-navbar_iconconnection_li_link">
                            Inscription
                        </NavLink>    
                    </li>
                    <li >
                        <img src="./img/login.svg" alt="connection" />
                    </li>
                   
                </ul>
            )}
        </nav>

    );
}





export default Navbar;







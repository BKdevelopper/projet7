import React, { useState, useContext, useEffect } from "react";
import "./style/Login.scss";
import { NavLink, useHistory } from "react-router-dom";
import Auth from "../../context/Auth";
import { login } from "../../services/AuthApi";
import { ErreurChampObligatoire, ErreurPassword } from "../../services/Erreur";

const Login = (props) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let errLog = document.getElementById("Erreur-Form");
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (username && password) {
        if (ErreurPassword(password)) {
          const response = await login(username, password);
          if (response) {
            setIsAuthenticated(response);
            history.replace("/posts");
          } else {
            errLog.innerHTML = "Username ou mot de passe incorrect";
          }
        }
      } else {
        ErreurChampObligatoire();
      }
    } catch ({ response }) {
      console.log(response);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.replace("/posts");
    }
  }, [history, isAuthenticated]);

  return (
    <div className="container-login">
      <form className="formulaire" onSubmit={handleLogin}>
        <div className="container-login_form">
          <div className="container-login_form_username">
            <label
              htmlFor="username"
              className="container-login_form_username_texte"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="container-login_form_username_input"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="container-login_form_password">
            <label
              htmlFor="password"
              className="container-login_form_password_texte"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="container-login_form_password_input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="container-login_form_btn">
            <input
              type="submit"
              className="container-login_form_btn_login"
              value="Se connecter"
            />
            <NavLink
              className="container-login_form_btn_register"
              to="/register"
            >
              Inscription
            </NavLink>
          </div>
          <div id="Erreur-Form"></div>
        </div>
      </form>
    </div>
  );
};

export default Login;

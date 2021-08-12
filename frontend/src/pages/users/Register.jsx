import React, { useState } from "react";
import "./style/Register.scss";
import { register } from "../../services/AuthApi";
import { useHistory } from "react-router-dom";
import {
  ErreurChampObligatoire,
  ErreurPassword,
  ErreurEmail,
} from "../../services/Erreur";

const Register = (props) => {
  const history = useHistory();
  let errReg = document.getElementById("Erreur-Form");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && email && password) {
      if (ErreurEmail(email)) {
        if (ErreurPassword(password)) {
          const response = register(username, email, password);
          response.then((valeur) => {
            if(valeur === true ){
              history.push("/login");
            }
            else{
              errReg.innerHTML = "Username ou mail déjà utilisé";
            }
            })
        }
      }
    } else {
      ErreurChampObligatoire();
    }
  };

  return (
    <div className="container-register">
      <form className="formulaire" onSubmit={handleRegister}>
        <div className="container-register_form">
          <div className="container-register_form_username">
            <label
              htmlFor="username"
              className="container-register_form_username_texte"
            >
              Username
            </label>
            <input
              type="text"
              className="container-register_form_username_input"
              id="username"
              placeholder="Votre username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="container-register_form_email">
            <label
              htmlFor="email"
              className="container-register_form_email_texte"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="exemple@exemple.com"
              className="container-register_form_email_input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="container-register_form_password">
            <label
              htmlFor="password"
              className="container-register_form_password_texte"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              id="password"
              className="container-register_form_password_input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <input
            type="submit"
            className="container-register_form_btn"
            value="S'enregistrer"
          />
          <div id="Erreur-Form"></div>
        </div>
      </form>
    </div>
  );
};

export default Register;

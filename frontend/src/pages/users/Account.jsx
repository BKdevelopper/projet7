import React, { useContext, useEffect, useState } from "react";
import Auth from "../../context/Auth";
import { UidContext } from "../../context/UserID";
import { deleteAccount, deleteAllAccount } from "../../services/AuthApi";
import "./style/Account.scss";
import axios from "axios";
import { ErreurChampObligatoire, ErreurEmail } from "../../services/Erreur";
import { updateEmail } from "../../services/AuthApi";
const Account = (props) => {
  let errLog = document.getElementById("Erreur-Form");
  const { setIsAuthenticated } = useContext(Auth);
  const uid = useContext(UidContext);
  const [user, setUser] = useState([]);
  const [AllUser, setAllUser] = useState([]);
  const [emailUser, setEmailUser] = useState("");


  useEffect(() => {
    async function fetchData(id) {
      const reqAllUser = await axios.get(`${process.env.REACT_APP_URL}/api/auth`);
      setAllUser(reqAllUser.data.results);
      const reqUser = await axios.get(`${process.env.REACT_APP_URL}/api/auth/${id}`);
      setUser(reqUser.data.results);
    }
    fetchData(uid);
  }, [uid]);

  const handleUpdateEmail = async () => {
    if (emailUser && user[0]) {
      if (ErreurEmail(emailUser)) {
        const dataEmail = {
          email: emailUser,
        };
       const res = await updateEmail(uid,dataEmail);
       if (res){
        setUser([{email : emailUser ,idUser : uid,isAdmin : user[0].isAdmin ,username : user[0].username }])
       }else{
        errLog.innerHTML = "Email déjà utilisé";
        errLog.style.color ="red"
        errLog.style.textAlign="center"
       }
              
      }
    } else {
      ErreurChampObligatoire();
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      const res = await deleteAccount(uid);
      setIsAuthenticated(res);
    } catch ({ res }) {
      console.log(res);
    }
  };
  const handleDeleteAllAccount = async (idUser) => {

    await deleteAllAccount(idUser);
    
    if(AllUser.length > 0){
      let updatedRows = [...AllUser]
      let indexToRemove = updatedRows.findIndex(x => x.idUser === idUser);
      if(indexToRemove > -1){
         updatedRows.splice(indexToRemove, 1)
         setAllUser(updatedRows);
      }
   }

  };

  return (    
    <>
     {user.map((person) => (
        <div key={person.idUser}>
          <div className="container-account" >
            <div className="container-account_username">
              <b>Username :</b> {person.username}
            </div>
            <div className="container-account_email">
              <b>Email :</b> {person.email}
            </div>
            <div className="container-account_role">
              {person.isAdmin === 0 ? (
                <div className="container-account_role_text">
                  <b>Rôle :</b> Membre
                </div>
              ) : (
                <div className="container-account_role_text">
                  <b>Rôle :</b> Admin
                </div>
              )}
            </div>
            <input
              type="submit"
              className="container-account_btn"
              onClick={handleDeleteAccount}
              value="Supprimer mon compte"
            />
          </div>

          {person.isAdmin === 1 ? (
            <div className="container-accountAdmin">
              <table>
                <tbody>
                <tr>
                  <td>
                    <b>Username</b>
                  </td>
                  <td>
                    <b>Email</b>
                  </td>
                  <td>
                    <b>Suppression</b>
                  </td>
                </tr>
                {AllUser.map((AllUsers) => (
                  <tr key={AllUsers.idUser}>
                    <td>{AllUsers.username}</td>
                    <td>{AllUsers.email}</td>
                    <td id="icon" value={AllUsers.idUser}>
                      <i
                        className="far fa-trash-alt container-post_icon_delete"
                        onClick={(e) => handleDeleteAllAccount(AllUsers.idUser)}
                      ></i>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      ))}

      <div className="container-EmailAccount">
        <div className="container-EmailAccount_title">Modifier votre email</div>
        <input
          className="container-EmailAccount_email"
          placeholder="exemple@exemple.com"
          type="email"
          onChange={(e) => setEmailUser(e.target.value)}
          value={emailUser}
        />
        <input
          className="container-EmailAccount_submit"
          type="submit"
          value="Modifier"
          onClick={handleUpdateEmail}
        />
        <div id="Erreur-Form"></div>
      </div>
      
    </>
    
  );
  
};

export default Account;

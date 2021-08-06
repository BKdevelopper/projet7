import React, {useContext, useEffect, useState} from "react";
import Auth from "../../context/Auth";
import { UidContext } from "../../context/UserID";
import { deleteAccount } from "../../services/AuthApi";
import './style/Account.scss';
import axios from "axios";
const Account = (props) => {

  const { setIsAuthenticated } = useContext(Auth)
  const uid = useContext(UidContext);
  const [user, setUser] = useState([])
  const [AllUser, setAllUser] = useState([])
  const [emailUser, setEmailUser] = useState("");
  //const [data, setData] = useState(null);

  useEffect(()=>{
 
    async function fetchData(id){
      const reqAllUser = await axios.get("http://localhost:3000/api/auth");
      setAllUser(reqAllUser.data.results)
      const reqUser = await axios.get(`http://localhost:3000/api/auth/${id}`);
      setUser(reqUser.data.results)

    }    
    fetchData(uid)
  },[uid])

  const handleUpdateEmail = () => {
   
    const data = {
      email: emailUser
    }
    axios.put(`http://localhost:3000/api/auth/updateEmail/${uid}`, data).then(res => {
      //setData(res.data);
      setEmailUser('');
   
    }).catch(err => {
     console.log(err)
    });
  }    

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
    const res = await deleteAccount(uid)
      setIsAuthenticated(res)
    } catch ({res}) {
      console.log(res);
    }     
  };

  return (
    <>
      {user.map((users)=>(
        <>
          <div className="container-account">
            <div className="container-account_username"><b>Username :</b> {users.username}</div>
            <div className="container-account_email"><b>Email :</b> {users.email}</div>
            <div className="container-account_role">
              {users.isAdmin === 0 ?
              (<div className="container-account_role_text"><b>Rôle :</b> Membre</div>)
              :
              (<div className="container-account_role_text"><b>Rôle :</b> Admin</div>)}
            </div>
            <input type="submit" className="container-account_btn" onClick={handleDeleteAccount} value="Supprimer mon compte"/>
          </div>

          {users.isAdmin === 1 ?
          (<div className="container-accountAdmin"><table>
                <tr>
                       <td><b>Username</b></td>
                       <td><b>Email</b></td>
                       <td><b>Suppression</b></td>
                </tr>
             {AllUser.map((AllUsers)=>(
                  <tr>
                       <td>{AllUsers.username}</td>
                       <td>{AllUsers.email}</td>
                       <td id="icon"><i class="far fa-trash-alt container-post_icon_delete"></i></td>
                  </tr>
             ))}
          </table></div>)
          :
          (null)}
        </>
      ))}
        
          <div className="container-EmailAccount">
            <div className="container-EmailAccount_title">Modifier votre email</div>
            <input className="container-EmailAccount_email" placeholder="exemple@exemple.com" type="email"  onChange={(e) => setEmailUser(e.target.value)} value={emailUser}/>
            <input className="container-EmailAccount_submit" type="submit" value="Modifier" onClick={handleUpdateEmail}/>
          </div>
        
   </>
    
   
  
);
};

export default Account;


import axios from "axios"
import jwtDecode from "jwt-decode"
import { getItem, setItem, removeItem } from "./LocalStorage";

export function hasAuthenticated(){
    const token = getItem('jwt');
    const result = token ? tokenIsValid(token) : false;

    if (result === false){
        removeItem('jwt')
    }
    return result;
}
export function login(username, password){
   return axios({
        method: "post",
        url: 'http://localhost:3000/api/auth/login',      
        withCredentials: true,
        data: {
          username,
          password,
        },
      })
    .then((res) => {
        const token = res.data.accessToken;
        setItem('jwt', token)
        return true
    }) 
    .catch((err) => console.log(err));          
}
export function deleteAccount(idUser) {
  return axios.delete(`http://localhost:3000/api/auth/deleteAccount/${idUser}`).then((res) => {removeItem('jwt'); return false});
 }



export function register(username, email, password){
    return axios({
      method: "post",
      url: `http://localhost:3000/api/auth/signup`,
      data: {
        username,
        email,
        password,
      },
    })
      .then((res) => {
       return true
      })
      .catch((err) => console.log(err));      
 }

export function tokenIsValid(token){
   
    const decodedToken = jwtDecode(token);
      console.log(decodedToken.id)
       if (!decodedToken) {
       return false
       }
      
       return true;
}

export function logout(){
    removeItem('jwt')
}
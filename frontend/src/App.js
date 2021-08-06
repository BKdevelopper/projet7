import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Post from './pages/posts/Post';
import Posts from './pages/posts/Posts';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Account from './pages/users/Account';
import Profile from './pages/users/Profile';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Auth from './context/Auth';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { hasAuthenticated } from './services/AuthApi';
import { getItem } from "./services/LocalStorage";
import jwtDecode from "jwt-decode"
import {UidContext} from "./context/UserID"
//import axios from 'axios';


function App() {
 // const { uid }= useContext(Auth)
  const [isAuthenticated, setIsAuthenticated] = useState(hasAuthenticated());
  const [uid,setUid] = useState(null)
  
 

  useEffect(()=>{
    if(isAuthenticated){
      const token = getItem('jwt');
      const decodedToken = jwtDecode(token);
      setUid(decodedToken.id)
      
   }
}, [isAuthenticated])


  return (
    <Auth.Provider value={{isAuthenticated, setIsAuthenticated}}>   
     <UidContext.Provider value={uid}>
        <BrowserRouter>        
          <div className="container-fluid">      
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />           
              <Route exact path="/posts/:id" component={Post} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />             
              <AuthenticatedRoute path="/posts" component={Posts} />
              <AuthenticatedRoute path="/account" component={Account} />
              <AuthenticatedRoute path="/profile" component={Profile} />              
            </Switch>
          </div>       
        </BrowserRouter>
        </UidContext.Provider>
    </Auth.Provider>
  );
}

export default App;

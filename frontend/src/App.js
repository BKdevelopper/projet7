import React, { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './pages/posts/Posts';
import Login from './pages/users/Login';
import Register from './pages/users/Register';
import Account from './pages/users/Account';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Auth from './context/Auth';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { hasAuthenticated } from './services/AuthApi';
import { getItem } from "./services/LocalStorage";
import jwtDecode from "jwt-decode"
import {UidContext} from "./context/UserID"

function App() {
 
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
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />             
              <AuthenticatedRoute path="/posts" component={Posts} />
              <AuthenticatedRoute path="/account" component={Account} />
                         
            </Switch>
          </div>       
        </BrowserRouter>       
      </UidContext.Provider>
    </Auth.Provider>
  );
}

export default App;

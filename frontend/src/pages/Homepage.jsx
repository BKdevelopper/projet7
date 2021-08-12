import Auth from "../context/Auth";
import React, { useContext } from "react";
import { Redirect } from "react-router";


const Homepage = () => {
  const { isAuthenticated } = useContext(Auth);

  return isAuthenticated ? (
    <Redirect to="/posts" />
  ) : (
    <Redirect to="/login" />
  );
};

export default Homepage;

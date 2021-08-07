import Auth from "../context/Auth";
import React, { useContext } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router";
const AuthenticatedRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(Auth);

  return isAuthenticated ? (
    <Route exact path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};
export default AuthenticatedRoute;

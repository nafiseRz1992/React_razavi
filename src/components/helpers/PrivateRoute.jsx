import React from "react";
import { Route } from "react-router-dom";

const userIsAuthenticate = () => {
  const token = localStorage.getItem('ACCESS_TOKEN_NAME');
  return token !== null && token !== '';
}

const PrivateRoute = (props) => {
  const { component: Component, path, ...rest } = props;
  const user = localStorage.getItem('USER');
  const jsonUser = JSON.parse(user);
  console.info(jsonUser);
  return (
    <Route
      {...rest}
      render={() => (
        userIsAuthenticate()
          ? <Component user={jsonUser} />
          : window.location.href = '/signin'
      )}
    />
  );
};

export default PrivateRoute;



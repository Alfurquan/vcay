import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  path,
  user,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!user) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;

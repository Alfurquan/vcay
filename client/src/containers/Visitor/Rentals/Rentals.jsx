import React from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";

const Rentals = props => {
  const dispatch = useDispatch();

  const callMe = async () => {
    try {
      await dispatch(authActions.getMessage());
    } catch (ex) {
      console.log("inside", ex);
      if (
        (ex.response && ex.response.status === 400) ||
        ex.response.status === 401
      ) {
        window.location = "/login";
      }
    }
  };

  const logout = () => {
    try {
      dispatch(authActions.logout());
      window.location = "/";
    } catch (ex) {
      console.log("err", ex);
    }
  };

  return (
    <div>
      <button onClick={callMe}>Click me</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Rentals;

import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Navlink from "../NavLink/Navlink";
import Aux from "../../../Hoc/Hoc/hoc";

const NavBar = props => {
  const user = props.user;
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="index.html">
          <img src="assets/img/logo.png" className="logo" alt="" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ml-auto">
            <Navlink link="/" label="Home" />
            <Navlink link="/about" label="About" />
            <Navlink link="/rentals" label="Rentals" />
            {user && user.role == "host" && (
              <Navlink link="/host/rentals" label="Host a Rental" />
            )}
            {!user ? (
              <Aux>
                <Navlink link="/login" label="Login" />
                <Navlink link="/register" label="Register" />
              </Aux>
            ) : (
              <Navlink link="/dashboard" label={user.name} />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

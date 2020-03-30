import React from "react";
import "./Navlink.css";
import { NavLink } from "react-router-dom";

const Navlink = props => {
  return (
    <li className="nav-item mr-3">
      {props.link === "/register" ? (
        <NavLink className="nav-link" to={props.link}>
          {props.label}
        </NavLink>
      ) : (
        <NavLink exact className="nav-link" to={props.link}>
          {props.label}
        </NavLink>
      )}
    </li>
  );
};

export default Navlink;

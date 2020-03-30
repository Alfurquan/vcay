import React from "react";
import Aux from "../Aux/aux";
import NavBar from "../../components/Navigation/NavBar/Navbar";

const Layout = props => {
  return (
    <Aux>
      <NavBar user={props.user} />
      <main>{props.children}</main>
    </Aux>
  );
};

export default Layout;

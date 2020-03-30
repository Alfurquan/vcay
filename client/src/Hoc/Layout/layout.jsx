import React from "react";
import Aux from "../Hoc/hoc";
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

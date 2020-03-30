import React from "react";
import classes from "../Button/button.module.css";

const Button = props => {
  const appliedClasses = [classes.button, props.classes].join(" ");
  return (
    <button
      className={appliedClasses}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

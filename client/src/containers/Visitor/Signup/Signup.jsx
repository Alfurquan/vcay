import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../../../components/Common/form";
import * as authActions from "../../../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card/Card";
import "./Signup.css";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      phone: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password"),
    name: Joi.string()
      .required()
      .min(5)
      .max(50)
      .label("Name"),
    phone: Joi.string()
      .required()
      .min(10)
      .max(10)
      .label("Phone number")
  };

  doSubmit = async () => {
    console.log("submitted");
    console.log("user", this.state.data);
    try {
      await this.props.register(this.state.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.data = ex.response.data;
        this.setState({
          errors
        });
      }
    }
    if (this.state.errors.data) {
      alert(this.state.errors.data);
    }
  };

  render() {
    return (
      <section className="main-content">
        <div className="container">
          <div className="rw">
            <Link className="host-link" to="/register/host">
              Continue as Host
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <Card>
                <div className="header">
                  <h2>Sign up</h2>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                  {this.renderInput("name", "Name", "text", "fa fa-user")}
                  {this.renderInput(
                    "email",
                    "Email",
                    "email",
                    "fa fa-envelope"
                  )}
                  {this.renderInput("phone", "Phone", "number", "fa fa-phone")}
                  {this.renderInput(
                    "password",
                    "Password",
                    "password",
                    "fa fa-lock"
                  )}
                  {this.renderButton("Sign up", this.handleSubmit)}
                </form>
              </Card>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  As our member you have access to most awesome places in the
                  world.
                </h2>
                <img
                  src={require("../../../assets/images/register.jpg")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: async user => await dispatch(authActions.signup(user))
  };
};

export default connect(null, mapDispatchToProps)(Signup);

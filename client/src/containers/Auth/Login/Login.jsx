import React, { Component } from "react";
import Form from "../../../components/Common/form";
import * as authActions from "../../../store/actions/auth";
import { connect } from "react-redux";
import Joi from "joi-browser";
import "./Login.css";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card/Card";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
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
      .label("Password")
  };

  doSubmit = async () => {
    // console.log("submitted");
    // console.log("user", this.state.data);
    try {
      await this.props.login(this.state.data.email, this.state.data.password);
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
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-6">
              <Card>
                <div className="header">
                  <h2>Log in</h2>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                  {this.renderInput(
                    "email",
                    "Email",
                    "email",
                    "fa fa-envelope"
                  )}
                  {this.renderInput(
                    "password",
                    "Password",
                    "password",
                    "fa fa-lock"
                  )}
                  {this.renderButton("Log in", this.handleSubmit)}
                </form>
                <Link className="link" to="/reset">
                  Forgot Password?
                </Link>
              </Card>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">
                  Hundreds of awesome places in reach of few clicks.
                </h2>
                <img src={require("../../../assets/images/login.jpg")} alt="" />
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
    login: (email, password) => dispatch(authActions.login(email, password))
  };
};

export default connect(null, mapDispatchToProps)(Login);

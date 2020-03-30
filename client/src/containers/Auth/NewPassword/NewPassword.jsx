import React, { Component } from "react";
import Form from "../../../components/Common/form";
import Joi from "joi-browser";
import Card from "../../../components/UI/Card/Card";
import * as authActions from "../../../store/actions/auth";
import { connect } from "react-redux";

class NewPassword extends Form {
  state = {
    data: {
      password: ""
    },
    errors: {},
    resetToken: ""
  };
  schema = {
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };

  async componentDidMount() {
    const token = this.props.match.params.token;
    this.setState({
      resetToken: token
    });
    try {
      await this.props.getNewPassword(token);
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
        const errors = { ...this.state.errors };
        errors.data = ex.response.data;
        this.setState({
          errors
        });
      }
    }
    if (this.state.errors.data) {
      alert(this.state.errors.data);
      window.location = "/reset";
    }
  }

  doSubmit = async () => {
    // console.log("submitted");
    // console.log("user", this.state.data);
    try {
      await this.props.postNewPassword(
        this.state.data.password,
        this.state.resetToken
      );
      alert("Password updated succesfully");
      this.props.history.push("/login");
    } catch (ex) {
      if (ex.response && ex.response.status >= 400) {
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
          <div className="row justify-content-center">
            <div className="col-md-6">
              <Card>
                <div className="header">
                  <h2>Reset Password</h2>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Reset", this.handleSubmit)}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getNewPassword: token => dispatch(authActions.getNewPassword(token)),
    postNewPassword: (password, token) =>
      dispatch(authActions.postNewPassword(password, token))
  };
};

export default connect(null, mapDispatchToProps)(NewPassword);

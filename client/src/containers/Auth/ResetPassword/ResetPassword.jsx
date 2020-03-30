import React, { Component } from "react";
import Form from "../../../components/Common/form";
import Joi from "joi-browser";
import * as authActions from "../../../store/actions/auth";
import { connect } from "react-redux";
import Card from "../../../components/UI/Card/Card";

class ResetPassword extends Form {
  state = {
    data: {
      email: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = async () => {
    // console.log("submitted");
    // console.log("user", this.state.data);
    try {
      await this.props.sendMail(this.state.data.email);
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
                  <h2>Lost Password</h2>
                </div>
                <form className="form" onSubmit={this.handleSubmit}>
                  <p>
                    Enter the e-mail address associated with your account. Click
                    submit to have your password e-mailed to you.
                  </p>
                  {this.renderInput("email", "Email", "email")}
                  {this.renderButton("Submit", this.handleSubmit)}
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
    sendMail: email => dispatch(authActions.postResetMail(email))
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);

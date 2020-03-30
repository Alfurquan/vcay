import React from "react";
import Joi from "joi-browser";
import Form from "../../../components/Common/form";
import * as authActions from "../../../store/actions/auth";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Signup.css";
import Tick from "../../../components/Common/tick";
import Card from "../../../components/UI/Card/Card";

class HostSignup extends Form {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    data: {
      name: "",
      email: "",
      password: "",
      phone: "",
      isHost: "true"
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
      .label("Phone number"),
    isHost: Joi.string().required()
  };

  doSubmit = async () => {
    // console.log("submitted");
    // console.log("user", this.state.data);
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

  scroll(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <section>
        <div className="cover">
          <div className="content">
            <h2>Earn money as a host</h2>
            <Link
              onClick={() => {
                this.scroll(this.myRef);
              }}
              className="host-link"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="container py-5 px-5">
          <div className="row summary">
            <div className="col-lg-6 col-md-6 px-4">
              <h3 className="text-main pb-2">Why host on Vcay?</h3>
              <p>
                No matter what kind of home or room you have to share, Airbnb
                makes it simple and secure to host travelers. You’re in full
                control of your availability, prices, house rules, and how you
                interact with guests.
              </p>
            </div>
            <div className="col-lg-6 col-md-6 px-4">
              <h3 className="text-main pb-2">We have your back</h3>
              <p>
                To keep you, your home, and your belongings safe, we cover every
                booking with property damage protection and insurance against
                accidents.
              </p>
            </div>
          </div>
          <hr />
          <div className="hosting-steps">
            <h1 className="text-center">Hosting in 3 steps</h1>
            <div className="steps py-5">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <Tick height="48px" width="48px" fill="#484848" />
                  <h5 className="py-3">List your space for free</h5>
                  <p>
                    Share any space without sign-up charges, from a shared
                    living room to a second home and everything in-between.
                  </p>
                </div>
                <div className="col-lg-4 col-md-4">
                  <Tick height="48px" width="48px" fill="#484848" />
                  <h5 className="py-3">Decide how you want to host</h5>
                  <p>
                    Choose your own schedule, prices, and requirements for
                    guests. We’re there to help along the way.
                  </p>
                </div>
                <div className="col-lg-4 col-md-4">
                  <Tick height="48px" width="48px" fill="#484848" />
                  <h5 className="py-3">Welcome your first guest</h5>
                  <p>
                    Once your listing is live, qualified guests can reach out.
                    You can message them with any questions before their stay.
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="payments">
              <h1 className="text-center">Payments made simple</h1>
              <div className="steps py-5">
                <div className="row">
                  <div className="col-lg-4 col-md-4">
                    <h5 className="py-3">Charge what you want</h5>
                    <p>
                      You always get to pick your price. Need help? We have
                      tools to help you match demand in your area.
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <h5 className="py-3">Pay low fees</h5>
                    <p>
                      There’s no cost to sign up. Vcay generally charges hosts a
                      flat 3% per reservation, among the lowest fees in the
                      industry.
                    </p>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <h5 className="py-3">Get paid quickly</h5>
                    <p>
                      Once a guest checks in, we can send your money by Paypal,
                      direct deposit, or other available methods.
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <h1 ref={this.myRef} className="text-center">
                Get Started!
              </h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-center pb-5">
          <div className="col-md-5">
            <Card>
              <div className="header">
                <h2>Sign up</h2>
              </div>
              <form className="form" onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name", "text", "fa fa-user")}
                {this.renderInput("email", "Email", "email", "fa fa-envelope")}
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

export default connect(null, mapDispatchToProps)(HostSignup);

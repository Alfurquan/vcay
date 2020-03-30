import React, { Component } from "react";
import "./App.css";
import Layout from "./Hoc/Layout/layout";
import { Switch, Route } from "react-router-dom";
import Signup from "./containers/Visitor/Signup/Signup";
import HostSignup from "./containers/Host/Signup/Signup";
import Rentals from "./containers/Visitor/Rentals/Rentals";
import About from "./containers/About/About";
import Home from "./containers/Home/Home";
import * as authActions from "./store/actions/auth";
import { connect } from "react-redux";
import Login from "./containers/Auth/Login/Login";
import ResetPassword from "./containers/Auth/ResetPassword/ResetPassword";
import NewPassword from "./containers/Auth/NewPassword/NewPassword";
import Dashboard from "./containers/Dashboard/Dashboard";
import ProtectedRoute from "./components/Common/protectedRoute";
import HostRental from "./containers/Host/Rentals/HostRental/HostRental";

class App extends Component {
  state = {};

  componentDidMount = async () => {
    try {
      await this.props.checkAuthStatus();
      this.setState({
        user: this.props.user
      });
      console.log("app user", this.props.user);
    } catch (err) {
      console.log("err", err);
    }
  };

  render() {
    const user = this.state.user;
    return (
      <Layout user={user}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register/host" component={HostSignup} />
          <Route path="/register" component={Signup} />
          <Route path="/reset/:token" component={NewPassword} />
          <Route path="/reset" component={ResetPassword} />
          <Route path="/rentals" component={Rentals} />
          <ProtectedRoute
            user={this.props.user}
            path="/host/rentals"
            component={HostRental}
          />
          <ProtectedRoute
            user={this.props.user}
            path="/dashboard"
            component={Dashboard}
          />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStatus: () => dispatch(authActions.checkStatus())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

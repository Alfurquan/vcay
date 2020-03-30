import http from "../../services/httpService";
import { apiUrl } from "../../config/config.json";
export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = user => {
  return { type: AUTHENTICATE, user: user };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await http.post(apiUrl + "api/users/login", {
        email: email,
        password: password
      });
      console.log("response", response);
      dispatch(authenticate(response.data));
    } catch (ex) {
      throw ex;
    }
  };
};

export const getMessage = () => {
  return async dispatch => {
    try {
      const response = await http.get(apiUrl + "api/rentals/me");
      console.log("res", response);
    } catch (ex) {
      console.log("err", ex.response);
      throw ex;
    }
  };
};

export const signup = user => {
  return async dispatch => {
    try {
      const response = await http.post(apiUrl + "api/users/register", user);
      console.log("response", response);
      dispatch(authenticate(response.data));
    } catch (ex) {
      throw ex;
    }
  };
};

export const checkStatus = () => {
  return async dispatch => {
    try {
      const response = await http.get(apiUrl + "api/users/checkStatus");
      console.log("res", response);
      dispatch(authenticate(response.data));
    } catch (ex) {
      console.log("err", ex.response.data);
      dispatch({ type: LOGOUT });
    }
  };
};

export const postResetMail = email => {
  return async dispatch => {
    try {
      const response = await http.post(apiUrl + "api/users/reset", {
        email: email
      });
      console.log("res", response);
    } catch (ex) {
      console.log("err", ex.response.data);
      throw ex;
    }
  };
};

export const getNewPassword = token => {
  return async dispatch => {
    try {
      const response = await http.get(apiUrl + "api/users/reset/" + token);
      console.log("res", response);
    } catch (ex) {
      console.log("err", ex.response.data);
      throw ex;
    }
  };
};

export const postNewPassword = (password, token) => {
  return async dispatch => {
    console.log("entered");
    try {
      const response = await http.post(apiUrl + "api/users/password", {
        token: token,
        password: password
      });
      console.log("res", response);
    } catch (ex) {
      console.log("err", ex.response.data);
      throw ex;
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      const response = await http.get(apiUrl + "api/users/logout");
      console.log("res", response);
      dispatch({ type: LOGOUT });
    } catch (ex) {
      throw ex;
    }
  };
};

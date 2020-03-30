import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  user: null,
  isLoggedIn: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

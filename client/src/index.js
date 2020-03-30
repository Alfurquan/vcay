import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "jquery/dist/jquery";
import "popper.js";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import authReducer from "../src/store/reducers/auth";
import rentalReducer from "../src/store/reducers/rental";

const saveStoreToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  rentals: rentalReducer
});

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(ReduxThunk)
);

store.subscribe(() => saveStoreToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

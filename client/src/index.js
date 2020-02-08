import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Reducer from "./redux/Reducer";
import thunk from "redux-thunk";

const allReducer = {
  Reducer
};
const rootReducer = combineReducers(allReducer);

const store = createStore(rootReducer, applyMiddleware(thunk));
store.subscribe(() => console.log("store in index ", store.getState()));

ReactDOM.render(
  <AuthState>
    <AlertState>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </AlertState>
  </AuthState>,
  document.getElementById("root")
);

import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./App.css";
import SetAuthToken from "./utils/SetAuthToken";
import AuthContext from "./context/auth/AuthContext";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  SetAuthToken(localStorage.token);
}

const App = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />

      <div className="container">
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/" exact component={Home} />
        </Switch>
      </div>
    </div>
  );
};

export default App;

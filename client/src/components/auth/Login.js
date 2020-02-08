import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import { useHistory } from "react-router-dom";
import Alert from "../layout/Alert";
const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error === "Invalid credentials") {
      setAlert(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;
  const onchange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("please fill all fields");
    } else {
      login({ email, password });
    }
    console.log("Login", user);
  };
  return (
    <div className="form-container">
      <Alert />
      <h1>
        <b className="success">Login</b>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onchange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onchange}
          ></input>
        </div>
        <input
          type="submit"
          value="LOGIN"
          className="btn btn-success btn-block"
        ></input>
      </form>
    </div>
  );
};

export default Login;

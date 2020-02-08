import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import Alert from "../layout/Alert";

const Register = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  console.log("in register ", authContext);
  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error === "user has already exists") {
      setAlert(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  const { name, email, password, password2 } = user;
  const onchange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setAlert("Please Enter All Fields", "danger");
    } else if (password !== password2) {
      setAlert("Password not match", "danger");
    } else {
      register(user);
      // console.log("register", register({ name, email, password }));
    }
  };
  return (
    <div className="form-container">
      <Alert />
      <h1>
        <b>Account</b> Register
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onchange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onchange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onchange}
            required
            minLength="6"
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onchange}
            required
          ></input>
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-success btn-block"
        ></input>
      </form>
    </div>
  );
};

export default Register;

import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = props => {
  console.log(props.state);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const title = "Contact Store";
  const icon = "fas fa-id-card-alt";

  const clearContacts = () => {
    props.dispatch({ type: "CLEAR_CONTACTS" });
  };

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        Hello <i>Mr. {user && user.name}</i>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-success">
      <h3>
        <i className={icon} />
        {title}
      </h3>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { state };
};
export default connect(mapStateToProps)(Navbar);

import React from "react";
import axios from "axios";
import { connect } from "react-redux";

const ContactsItem = props => {
  const { _id, name, type, email, phone, address } = props.contact;
  const nameicon = "far fa-address-card";
  const phonicon = "fas fa-phone";
  const emailicon = "fas fa-envelope-open";
  const addressicon = "fas fa-map-marker-alt";

  // DELETE Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      props.dispatch({
        type: "DELETE",
        payload: id
      });
    } catch (err) {
      props.dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };
  const onDelete = id => {
    deleteContact(id);
    ClearAll();
  };
  const ClearAll = () => {
    props.dispatch({ type: "CLEAR_CURRENT_CONTACT" });
  };
  //it only change the current contact from null to value
  const onEdit = contact => {
    props.dispatch({
      type: "SET_CURRENT_CONTACT",
      contact
    });
    console.log(contact);
  };

  return (
    <div className="card bg-light">
      <h5 className="text-primary">
        <i className={nameicon}> {name}</i>
        <span
          style={{ float: "right", margin: "2%" }}
          className={`badge ${
            type === "professional" ? "badge-danger" : "badge-primary"
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h5>
      <ul className="list">
        {email && (
          <li>
            <i className={emailicon}></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className={phonicon}></i> {phone}
          </li>
        )}
        {address && (
          <li>
            <i className={addressicon}></i> {address}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => onEdit(props.contact)}
        >
          Edit
        </button>

        <button className="btn btn-danger btn-sm" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default connect()(ContactsItem);

import React, { useState, useEffect } from "react";

import axios from "axios";
import { connect } from "react-redux";

const ContactForm = props => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    type: "",
    phone: "",
    address: ""
  };

  const [contact, setContact] = useState(initialState);
  //when click on edit 'props.current' have value that set in the form and update made on by check props.current have value or null
  useEffect(() => {
    if (props.current !== null) {
      setContact(props.current);
    } else {
      setContact(initialState);
    }
    //eslint-disable-next-line
  }, [props.current]);

  // ADD Contact
  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/api/contacts", contact, config);
      props.dispatch({
        type: "ADD_CONTACT",
        contact: res.data
      });
    } catch (err) {
      props.dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };
  // UPDATE Contact
  const updateContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      props.dispatch({
        type: "UPDATE",
        contact: res.data
      });
    } catch (err) {
      props.dispatch({ type: "CONTACT_ERROR", payload: err.response.msg });
    }
  };

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmitForm = e => {
    e.preventDefault();
    if (props.current == null) {
      addContact(contact);
      setContact(initialState);
      console.log("contact is ", contact);
    } else {
      updateContact(contact);
      setContact(initialState);
      ClearAll();
    }
  };
  const ClearAll = () => {
    props.dispatch({ type: "CLEAR_CURRENT_CONTACT" });
  };

  return (
    <div>
      <h5>Contact Form</h5>
      <form onSubmit={handleSubmitForm}>
        <h3>{props.current == null ? "Add contact" : "Edit Contact"}</h3>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          value={contact.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Phone Number"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Enter Address"
          name="address"
          value={contact.address}
          onChange={handleChange}
        />
        <br />
        <h5>Contact Type</h5>
        <input
          type="radio"
          name="type"
          value="professional"
          checked={contact.type === "professional"}
          onChange={handleChange}
        />
        Proffessional{" "}
        <input
          type="radio"
          name="type"
          value="private"
          checked={contact.type === "private"}
          onChange={handleChange}
        />
        private
        <br />
        <div>
          {props.current == null ? (
            <input
              type="submit"
              value="submit"
              className="btn btn-success btn-block"
            ></input>
          ) : (
            <button
              className="btn btn-success btn-block"
              onClick={handleSubmitForm}
            >
              Update
            </button>
          )}
          {props.current && (
            <button className="btn btn-light btn-block" onClick={ClearAll}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = state => {
  const { Reducer } = state;
  const { current } = Reducer;
  // const { current } = state;
  return { current };
};

export default connect(mapStateToProps)(ContactForm);

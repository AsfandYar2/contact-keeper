import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import ContactsItem from "./ContactsItem";
import SearchForm from "./SearchForm";
import axios from "axios";
import Spinner from "../layout/Spinner";

const Contacts = props => {
  //Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      props.dispatch({
        type: "GET_CONTACTS",
        payload: res.data
      });
    } catch (err) {
      props.dispatch({ type: "CONTACT_ERROR", payload: err.response });
    }
  };
  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (
    props.contacts !== null &&
    props.contacts.length === 0 &&
    !props.loading
  ) {
    return <h4>Please add contacts</h4>;
  }
  return (
    <Fragment>
      {props.contacts !== null && !props.loading ? (
        <Fragment>
          <SearchForm />
          {props.filtered !== null
            ? props.filtered.map(contact => (
                <ContactsItem key={contact._id} contact={contact} />
              ))
            : props.contacts.map(contact => (
                <ContactsItem key={contact._id} contact={contact} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => {
  const { Reducer } = state;
  const { contacts, filtered, loading } = Reducer;
  // const { contacts, filtered } = state;
  return { contacts, filtered, loading };
};

export default connect(mapStateToProps)(Contacts);

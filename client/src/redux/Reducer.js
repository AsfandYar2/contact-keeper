import uuid from "uuid";

const inititialize = {
  contacts: null,
  current: null,
  filtered: null,
  error: null,
  loading: true
};

const Reducer = (state = inititialize, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.contact],
        loading: false
      };
    case "CLEAR_CONTACTS":
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      };
    case "UPDATE":
      return {
        ...state,
        contacts: [
          ...state.contacts.map(contact =>
            contact._id === action.contact._id ? action.contact : contact
          )
        ],
        loading: false
      };
    case "DELETE":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
        loading: false
      };
    case "SET_CURRENT_CONTACT":
      return { ...state, current: action.contact };
    case "CLEAR_CURRENT_CONTACT":
      return { ...state, current: null };
    case "FILTERCONTACTS":
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.text}`, "gi");
          return contact.name.match(regex);
        })
      };
    case "CLEAR":
      return { ...state, filtered: null };
    case "CONTACT_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default Reducer;

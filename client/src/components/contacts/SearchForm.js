import React from "react";
import { connect } from "react-redux";

const SearchForm = props => {
  let search = React.createRef();
  const onChange = e => {
    console.log("search", e.target.value, search.current.value);
    if (e.target.value !== "") {
      props.dispatch({
        type: "FILTERCONTACTS",
        text: e.target.value
      });
    } else {
      props.dispatch({ type: "CLEAR" });
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Search..."
          ref={search}
          onChange={onChange}
        ></input>
      </form>
    </div>
  );
};

export default connect()(SearchForm);

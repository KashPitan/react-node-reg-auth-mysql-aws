import React, { useState } from "react";
import axios from "axios";

const UserSearch = () => {
  const [searchText, setSearchText] = useState(null);
  const [foundUsers, setfoundUsers] = useState([]);

  const searchButtonHandler = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.get(
        `${process.env.REACT_APP_AUTH_API_URL}/search/user`,
        { params: { searchText } }
      );
      console.log(res);
      setfoundUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setSearchText(e.target.value);
    console.log(searchText);
  };

  return (
    <>
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <textarea
                onChange={onChange}
                id="icon_prefix2"
                className="materialize-textarea"
              ></textarea>
              <label htmlFor="icon_prefix2">Search for users</label>
            </div>
            <button
              className="waves-effect waves-light btn"
              onClick={searchButtonHandler}
            >
              search
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserSearch;

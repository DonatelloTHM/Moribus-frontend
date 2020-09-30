import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Search.scss";

function Search() {
  const searchValue = useSelector((state) => state.searchValue.searchPhrase);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (!e.target.value) {
      dispatch({ type: "CLEAR_PARKS" });
    }

    dispatch({
      type: "SEARCH_PARKS",
      payload: { searchPhrase: e.target.value },
    });

    dispatch({ type: "SET_CLOSE_RESULTS", payload: false });
  };
  return (
    <div className="search-bar1 ">
      <form className="search-bar-form1 swing-in-top-fwd">
        <input
          value={searchValue}
          onChange={handleSearch}
          className="search-field1"
          type="text"
          placeholder="Search for Parks, Activities, Sightings"
        />
        <input className="search-button1" type="submit" value="search" />
      </form>
    </div>
  );
}

export default Search;

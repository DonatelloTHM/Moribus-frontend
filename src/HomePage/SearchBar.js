import React, { useState } from "react";
import "./SearchBar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const searchValue = useSelector((state) => state.searchValue.searchPhrase);
  const dispatch = useDispatch();
  const history = useHistory();
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: "SEARCH_PARKS",
      payload: { searchPhrase: input },
    });
    history.push("/main");
  };

  return (
    <div className="search-bar ">
      <form
        onSubmit={handleSearch}
        className="search-bar-form swing-in-top-fwd"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="search-field"
          type="text"
          placeholder="Search for Parks, Activities, Sightings"
        />
        <input className="search-button" type="submit" value="search" />
      </form>
    </div>
  );
}

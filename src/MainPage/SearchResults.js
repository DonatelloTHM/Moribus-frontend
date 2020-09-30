import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";
import "./SearchResults.scss";
import { ReactComponent as Loader } from "./loader.svg";
import { ReactComponent as Water } from "./svg/water.svg";
import { ReactComponent as Wood } from "./svg/wood.svg";
import { ReactComponent as ArrowUP } from "./svg/up-arrow.svg";

function SearchResults() {
  const searchValue = useSelector((state) => state.searchValue.searchPhrase);
  const userPosition = useSelector((state) => state.userLocation);
  const loader = useSelector((state) => state.loaded.didLoad);
  const dispatch = useDispatch();
  const allParks = useSelector((state) => state.allParks.parks);
  const userLocation = useSelector((state) => state.userLocation);
  const closeResults = useSelector((state) => state.closeResults.closeResults);
  const [nearestResources, setNearestResources] = useState({});

  const renderParks = () => {
    if (allParks.length) {
      return allParks.map((park) => {
        return <Result key={park.parkCode} parkObj={park} />;
      });
    } else if (!loader) {
      return <h1 className="no-results">No Results</h1>;
    } else {
      return null;
    }
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/closest_resources?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`
    )
      .then((res) => res.json())
      .then((data) => setNearestResources(data));
  }, [userLocation.latitude]);

  const handleClose = () => {
    dispatch({ type: "SET_CLOSE_RESULTS", payload: !closeResults });
  };

  return (
    <div className={closeResults ? "search-results " : "search-results "}>
      {console.log(loader)}

      {nearestResources.water ? (
        <div className={closeResults ? "closed" : "resource-results "}>
          <div>
            <Water />
            <h1>{nearestResources.water.name}</h1>
            <h2>{nearestResources.water.distance} miles</h2>
          </div>
          <div>
            <Wood />
            <h1>{nearestResources.wood.name}</h1>
            <h2>{nearestResources.wood.distance} miles</h2>
          </div>
        </div>
      ) : null}
      <div className={closeResults ? "closed" : "park-results "}>
        {/* {allParks.length === 0 ? (
          searchValue.length > 2 ? (
            <h2>No Results</h2>
          ) : (
            <Loader />
          )
        ) : null} */}
        {loader ? <Loader className="loader" /> : null}
        {renderParks()}
      </div>
      <div onClick={handleClose} className="close-open">
        <ArrowUP className={closeResults ? "rotated-svg" : null} />
      </div>
    </div>
  );
}

export default SearchResults;

import React, { useEffect } from "react";
import Filter from "./Filter";
import Map from "./Map";
import "./MainPage.scss";
import { useDispatch } from "react-redux";

function MainPage() {
  const dispatch = useDispatch();
  //   useEffect(() => {
  //     fetch(
  //       "https://developer.nps.gov/api/v1/parks?limit=500&api_key=hovs0bVYUh15AhuPXqrCoBQGUdvhQinp6AJrLSKd"
  //     )
  //       .then((res) => res.json())
  //       .then((responset) => {
  //         const bzz = responset.data.map((park) => {
  //           return {
  //             name: park["fullName"],
  //             park_code: park["parkCode"],
  //             latlon: `POINT(${park.longitude}  ${park.latitude})`,
  //             state: park.states,
  //             image: park["images"][0] ? park["images"][0]["url"] : "",
  //           };
  //         });
  //         console.log(bzz);
  //       });
  //   });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      dispatch({ type: "SET_NEW_USER_LOCATION", payload: setUserLocation });
    });
  });

  return (
    <div className="main-page">
      <Filter />
      <Map />
    </div>
  );
}

export default MainPage;

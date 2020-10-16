import React, { useState } from "react";
import "./Sighting.scss";
import { ReactComponent as Animal } from "./bear.svg";
import { ReactComponent as Resource } from "./water.svg";
import { ReactComponent as BrownBear } from "./svg/brownbear.svg";
import { ReactComponent as BlackBear } from "./svg/blackbear.svg";
import { ReactComponent as Coyote } from "./svg/coyote.svg";
import { ReactComponent as Lynx } from "./svg/lynx.svg";
import { ReactComponent as MountainLion } from "./svg/mountainlion.svg";
import { ReactComponent as Wolf } from "./svg/wolf.svg";
import { ReactComponent as Wood } from "./svg/wood.svg";
import { ReactComponent as Water } from "./svg/water.svg";
import { AnimalSightingView } from "./AnimalSightingView";
import { useDispatch, useSelector } from "react-redux";
import ResourceSightingForm from "./ResourceSightingForm";
import { AskLogin } from "./AskLogin";

function Sighting() {
  const dispatch = useDispatch();
  const markerPosition = useSelector((state) => state.markerPosition);
  const { longitude, latitude } = markerPosition;
  const userLocation = useSelector((state) => state.userLocation);
  const selectedAnimal = useSelector(
    (state) => state.selectedAnimal.selectedAnimal
  );

  const selector = useSelector((state) => state.animalResourceSelector);
  const selectedResource = useSelector(
    (state) => state.selectedResource.selectedResource
  );

  // const [selector, setSelector] = useState({
  //   animal: false,
  //   resource: false,
  // });

  const setUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };

      let newViewport = {
        // height: "100vh",
        // width: "80vw",
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12,
      };
      dispatch({ type: "SET_NEW_VIEWPORT", payload: newViewport });
      dispatch({ type: "SET_NEW_USER_LOCATION", payload: setUserLocation });

      if (!longitude) {
        dispatch({
          type: "SET_MARKER_POSITION",
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      }
    });
  };

  const handleAnimalSelector = () => {
    // setSelector({ ...selector, animal: !selector.animal, resource: false });
    dispatch({
      type: "SET_ANIMAL_RESOURCE_SELECTOR",
      payload: { animal: !selector.animal, resource: false },
    });
    dispatch({ type: "SET_SELECTED_ANIMAL", payload: "" });
    dispatch({ type: "SET_CLOSE_RESULTS", payload: true });
    dispatch({ type: "SET_SELECTED_RESOURCE", payload: "" });
    dispatch({
      type: "SET_MARKER_POSITION",
      payload: {
        lat: "",
        lng: "",
      },
    });
  };

  const handleResourceSelector = () => {
    dispatch({
      type: "SET_ANIMAL_RESOURCE_SELECTOR",
      payload: { animal: false, resource: !selector.resource },
    });
    // setSelector({ ...selector, animal: false, resource: !selector.resource });
    dispatch({ type: "SET_SELECTED_RESOURCE", payload: "" });
    dispatch({ type: "SET_SELECTED_ANIMAL", payload: "" });
    dispatch({ type: "SET_CLOSE_RESULTS", payload: true });
    dispatch({
      type: "SET_MARKER_POSITION",
      payload: {
        lat: "",
        lng: "",
      },
    });
  };

  const handleAnimalClick = (e) => {
    setUserLocation();
    dispatch({ type: "SET_SELECTED_ANIMAL", payload: e.target.id });
    dispatch({ type: "SET_SELECTED_PARK", payload: {} });
  };

  const handleResourceClick = (e) => {
    setUserLocation();
    dispatch({ type: "SET_SELECTED_RESOURCE", payload: e.target.id });
    dispatch({ type: "SET_SELECTED_PARK", payload: {} });
  };

  return (
    <div className="sighting">
      {selectedAnimal ? <AnimalSightingView /> : null}
      {selectedResource ? <ResourceSightingForm /> : null}

      <Animal onClick={handleAnimalSelector} />
      {selector.animal ? (
        localStorage.token ? (
          <div className="animals scale-in-br">
            <div
              className={
                selectedAnimal === "Brown Bear"
                  ? "active-animal"
                  : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Brown Bear"
                className="clickDiv"
              ></div>
              <BrownBear />
              <h6>Brown Bear</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedAnimal === "Black Bear"
                  ? "active-animal"
                  : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Black Bear"
                className="clickDiv"
              ></div>
              <BlackBear />
              <h6>Black Bear</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedAnimal === "Coyote"
                  ? "active-animal"
                  : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Coyote"
                className="clickDiv"
              ></div>
              <Coyote />
              <h6>Coyote</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedAnimal === "Mountain Lion"
                  ? "active-animal"
                  : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Mountain Lion"
                className="clickDiv"
              ></div>
              <MountainLion />
              <h6>Mountain Lion</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedAnimal === "Bobcat"
                  ? "active-animal"
                  : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Bobcat"
                className="clickDiv"
              ></div>
              <Lynx />
              <h6>Bobcat</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedAnimal === "Wolf" ? "active-animal" : "animal-container"
              }
            >
              <div
                onClick={handleAnimalClick}
                id="Wolf"
                className="clickDiv"
              ></div>
              <Wolf />
              <h6>Wolf</h6>
            </div>
          </div>
        ) : (
          <AskLogin />
        )
      ) : null}
      <div className="vl"></div>
      <Resource onClick={handleResourceSelector} />
      {selector.resource ? (
        localStorage.token ? (
          <div className="resources scale-in-br">
            <div
              className={
                selectedResource === "Water"
                  ? "active-resource"
                  : "resource-container"
              }
            >
              <div
                onClick={handleResourceClick}
                id="Water"
                className="clickDiv"
              ></div>
              <Water />
              <h6>Water</h6>
            </div>
            <div className="vl"></div>
            <div
              className={
                selectedResource === "Wood"
                  ? "active-resource"
                  : "resource-container"
              }
            >
              <div
                onClick={handleResourceClick}
                id="Wood"
                className="clickDiv"
              ></div>
              <Wood />
              <h6>Wood</h6>
            </div>
          </div>
        ) : (
          <AskLogin />
        )
      ) : null}
    </div>
  );
}

export default Sighting;

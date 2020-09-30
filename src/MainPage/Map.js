import React, { useEffect } from "react";
import MapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
  Source,
  Layer,
  Popup,
} from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useDispatch, useSelector } from "react-redux";
import "./Map.scss";
import { ReactComponent as Resource } from "./water.svg";
import { ReactComponent as BrownBear } from "./svg/brownbear.svg";
import { ReactComponent as BlackBear } from "./svg/blackbear.svg";
import { ReactComponent as Coyote } from "./svg/coyote.svg";
import { ReactComponent as Lynx } from "./svg/lynx.svg";
import { ReactComponent as MountainLion } from "./svg/mountainlion.svg";
import { ReactComponent as Wolf } from "./svg/wolf.svg";
import { ReactComponent as Hiker } from "./hiking.svg";
import { ReactComponent as NationalPark } from "./park.svg";
import { ReactComponent as Wood } from "./svg/wood.svg";
import { ReactComponent as Water } from "./svg/water.svg";
import SearchResults from "./SearchResults";
import Search from "./Search";
import Sighting from "./Sighting";
import ResultPage from "./ResultPage";
import { DraggableControl } from "react-map-gl";
import AnimalPopup from "./AnimalPopup";
import { ResourcePopup } from "./ResourcePopup";

const circleToPolygon = require("circle-to-polygon");

function Map() {
  const selectedAnimal = useSelector(
    (state) => state.selectedAnimal.selectedAnimal
  );
  const popupAnimal = useSelector((state) => state.popupAnimal.popupAnimal);
  const popupResource = useSelector(
    (state) => state.popupResource.popupResource
  );
  const selectedResource = useSelector(
    (state) => state.selectedResource.selectedResource
  );
  const APIKEY = process.env.REACT_APP_MAPBOX_API_KEY;
  const sortingValue = useSelector((state) => state.sortingValue.sortingValue);
  const animalDisplay = useSelector((state) => state.markerDisplay.animals);
  const resourceDisplay = useSelector((state) => state.markerDisplay.resources);
  const parkDisplay = useSelector((state) => state.markerDisplay.parks);
  const animalRadius = useSelector((state) => state.markerDisplay.animalRadius);
  const selectedPark = useSelector((state) => state.selectedPark.selectedPark);
  const viewport = useSelector((state) => state.newViewport);
  const searchValue = useSelector((state) => state.searchValue.searchPhrase);
  const userLocation = useSelector((state) => state.userLocation);
  const ratingFilter = useSelector((state) => state.ratingFilter.ratingFilter);
  const rangeFilter = useSelector((state) => state.rangeFilter.rangeFilter);

  const animalSightings = useSelector(
    (state) => state.animalSightings.animalSightings
  );
  const resourceSightings = useSelector(
    (state) => state.resourceSightings.resourceSightings
  );
  const dispatch = useDispatch();

  const allParks = useSelector((state) => state.allParks.parks);

  const newAnimalSightingMarker = () => {
    switch (selectedAnimal) {
      case "Black Bear":
        return <BlackBear />;
      case "Brown Bear":
        return <BrownBear />;
      case "Coyote":
        return <Coyote />;
      case "Bobcat":
        return <Lynx />;
      case "Wolf":
        return <Wolf />;
      case "Mountain Lion":
        return <MountainLion />;

      default:
        break;
    }
  };

  const newResourceSightingMarker = () => {
    switch (selectedResource) {
      case "Water":
        return <Water />;
      case "Wood":
        return <Wood />;
      default:
        break;
    }
  };
  const resourceSightingMarker = (name) => {
    switch (name) {
      case "Water":
        return <Water className="marker" />;
      case "Wood":
        return <Wood className="marker" />;
      default:
        break;
    }
  };

  const dangerPolygonColor = (dangerLevel) => {
    switch (dangerLevel) {
      case "High Danger":
        return "#dd2c00";
      case "Considerable Danger":
        return "#ff9234";
      case "Moderate Danger":
        return "#fbd46d";
      case "Minor Danger":
        return "#519872";
      default:
        break;
    }
  };

  const animalSightingMarker = (name) => {
    switch (name) {
      case "Black Bear":
        return <BlackBear className="marker" />;
      case "Brown Bear":
        return <BrownBear className="marker" />;
      case "Coyote":
        return <Coyote className="marker" />;
      case "Bobcat":
        return <Lynx className="marker" />;
      case "Wolf":
        return <Wolf className="marker" />;
      case "Mountain Lion":
        return <MountainLion className="marker" />;

      default:
        break;
    }
  };

  const renderParkMarkers = () => {
    return allParks.map((park) => {
      return (
        <Marker
          key={park.parkCode}
          longitude={park.longitude}
          latitude={park.latitude}
          onClick={(e) => {
            dispatch({ type: "SET_SELECTED_PARK", payload: park });
            dispatch({
              type: "SET_NEW_VIEWPORT",
              payload: {
                longitude: park.longitude,
                latitude: park.latitude,
                zoom: 15,
              },
            });
          }}
        >
          <NationalPark className="marker" />
        </Marker>
      );
    });
  };

  const renderAnimalSightings = () => {
    return animalSightings.map((sighting) => {
      return (
        <Marker
          key={`M${sighting.id}`}
          longitude={sighting.longitude}
          latitude={sighting.latitude}
          onClick={(e) => {
            dispatch({ type: "SET_POPUP_ANIMAL", payload: sighting });
            dispatch({
              type: "SET_NEW_VIEWPORT",
              payload: {
                longitude: sighting.longitude,
                latitude: sighting.latitude,
                zoom: 15,
              },
            });
          }}
        >
          {animalSightingMarker(sighting.animal)}
        </Marker>
      );
    });
  };
  const renderResourceSightings = () => {
    return resourceSightings.map((sighting) => {
      return (
        <Marker
          key={`M${sighting.id}`}
          longitude={sighting.longitude}
          latitude={sighting.latitude}
          onClick={(e) => {
            dispatch({ type: "SET_POPUP_RESOURCE", payload: sighting });
            dispatch({
              type: "SET_NEW_VIEWPORT",
              payload: {
                longitude: sighting.longitude,
                latitude: sighting.latitude,
                zoom: 15,
              },
            });
          }}
        >
          {resourceSightingMarker(sighting.resource)}
        </Marker>
      );
    });
  };

  const renderAnimalRadius = () => {
    return animalSightings.map((sighting) => {
      const coordinates = [sighting.longitude, sighting.latitude]; //[lon, lat]
      const radius = sighting.radius; // in meters

      let polygon = circleToPolygon(coordinates, radius, 50);
      const polygonColor = dangerPolygonColor(sighting.dangerLevel);
      return (
        <React.Fragment key={sighting.id}>
          <Source
            key={`S${sighting.id}`}
            id={`${sighting.id}`}
            type="geojson"
            data={polygon}
          />
          <Layer
            key={`L${sighting.id}`}
            id={`${sighting.id}`}
            type="fill"
            source={`${sighting.id}`}
            paint={{
              "fill-color": polygonColor,
              "fill-opacity": 0.4,
            }}
          />
        </React.Fragment>
      );
    });
  };

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
    });
  };

  const handleDragEnd = (e) => {
    dispatch({ type: "SET_MARKER_POSITION", payload: e });
  };

  useEffect(() => {
    dispatch({ type: "SET_LOAD", payload: true });
    if (userLocation.latitude) {
      fetch(
        `http://localhost:3000/near_parks?phrase=${searchValue}&sort_by=${sortingValue}&rating=${ratingFilter}&range=${rangeFilter}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLocation),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          dispatch({ type: "SET_LOAD", payload: false });
          dispatch({ type: "SET_PARKS", payload: result });
        });
    }
  }, [
    userLocation.latitude,
    searchValue,
    sortingValue,
    ratingFilter,
    rangeFilter,
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/animal_sightings")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "SET_ANIMAL_SIGHTINGS", payload: data })
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/resource_sightings")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "SET_RESOURCE_SIGHTINGS", payload: data })
      );
  }, []);

  return (
    <div className="map">
      <Sighting />
      <Search />

      <SearchResults />

      <img
        className="find-me"
        onClick={setUserLocation}
        src="https://img.icons8.com/cotton/64/000000/worldwide-location--v1.png"
        alt="whatever"
      />
      <MapGL
        style={{ width: "82vw", height: "100vh" }}
        viewportChangeMethod="easeTo"
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        zoom={viewport.zoom}
        accessToken={APIKEY}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        onViewportChange={(viewport) => {
          dispatch({ type: "SET_NEW_VIEWPORT", payload: viewport });
          dispatch({ type: "SET_SELECTED_PARK", payload: {} });
          dispatch({ type: "SET_POPUP_ANIMAL", payload: {} });
          dispatch({ type: "SET_POPUP_RESOURCE", payload: {} });
        }}
      >
        <NavigationControl showCompass showZoom position="bottom-left" />
        {selectedAnimal ? (
          <Marker
            className="draggable-marker"
            draggable
            onDragEnd={handleDragEnd}
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            {newAnimalSightingMarker()}
          </Marker>
        ) : null}
        {selectedResource ? (
          <Marker
            className="draggable-marker"
            draggable
            onDragEnd={handleDragEnd}
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            {newResourceSightingMarker()}
          </Marker>
        ) : null}
        <Marker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
        >
          <Hiker />
          {/* <img
            src="https://img.icons8.com/plasticine/40/000000/street-view.png"
            alt="marker"
          /> */}
        </Marker>

        {parkDisplay ? renderParkMarkers() : null}
        {animalDisplay ? renderAnimalSightings() : null}
        {resourceDisplay ? renderResourceSightings() : null}

        {/* <Source id="maine" type="geojson" data={polygon} />
        <Layer
          id="maine"
          type="fill"
          source="maine"
          paint={{
            "fill-color": "#ff414d",
            "fill-opacity": 0.5,
          }}
        /> */}
        {animalRadius ? renderAnimalRadius() : null}
        {selectedPark.parkCode ? (
          <Popup
            latitude={selectedPark.latitude}
            longitude={selectedPark.longitude}
            closeButton={false}
            closeOnClick={selectedPark.parkCode ? false : true}
            offset={30}
            anchor="left"
            className="notsure"
          >
            <div className="popup-div">
              <ResultPage />
            </div>
          </Popup>
        ) : null}

        {popupAnimal.id ? (
          <Popup
            latitude={popupAnimal.latitude}
            longitude={popupAnimal.longitude}
            closeButton={false}
            closeOnClick={popupAnimal.id ? false : true}
            offset={30}
            anchor="left"
            className="notsure"
          >
            <div className="popup-div">
              <AnimalPopup />
            </div>
          </Popup>
        ) : null}

        {popupResource.id ? (
          <Popup
            latitude={popupResource.latitude}
            longitude={popupResource.longitude}
            closeButton={false}
            closeOnClick={popupResource.id ? false : true}
            offset={30}
            anchor="left"
            className="resource-pop"
          >
            <div className="popup-div">
              <ResourcePopup />
            </div>
          </Popup>
        ) : null}
      </MapGL>
    </div>
  );
}

export default Map;

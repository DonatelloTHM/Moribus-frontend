import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

const userInitialState = {
  id: 0,
  username: "",
  token: "",
  name: "",
  email: "",
  address: "",
  city: "",
  us_state: "",
  zipcode: 0,
  photo: "",
};

const animalResourceSelector = {
  animal: false,
  resource: false,
};

const rangeFilter = {
  rangeFilter: 0,
};

const ratingFilter = {
  ratingFilter: 0,
};

const sortingValue = {
  sorting: "distance",
};

const closeResults = {
  closeResults: false,
};

const activeParkReviews = {
  activeParkReviews: [],
};

const markerPosition = {
  latitude: "",
  longitude: "",
};

const markerDisplay = {
  animals: true,
  resources: true,
  parks: true,
  animalRadius: true,
};

const selectedAnimal = {
  selectedAnimal: "",
};
const selectedResource = {
  selectedResource: "",
};

const selectedPark = {
  selectedPark: {},
};

const popupAnimal = {
  popupAnimal: {},
};
const popupResource = {
  popupResource: {},
};

const allParks = {
  parks: [],
};

const animalSightings = {
  animalSightings: [],
};
const resourceSightings = {
  resourceSightings: [],
};

const searchValue = {
  searchPhrase: "",
};

const mapViewport = {
  // width: "80vw",
  // height: "100vh",
  latitude: 42.430472,
  longitude: -123.334102,
  zoom: 16,
};

const userLocation = {
  latitude: 0,
  longitude: 0,
};

const loaded = {
  didLoad: false,
};

// use default arg to set oldState (if oldState is undefined, which it will be on the first call, then use the initialState)

const ratingFilterReducer = (state = ratingFilter, action) => {
  switch (action.type) {
    case "SET_RATING_FILTER":
      return {
        ...state,
        ratingFilter: action.payload,
      };
    default:
      return state;
  }
};
const animalResourceReducer = (state = animalResourceSelector, action) => {
  switch (action.type) {
    case "SET_ANIMAL_RESOURCE_SELECTOR":
      debugger;
      const { animal, resource } = action.payload;
      return {
        ...state,
        animal: animal,
        resource: resource,
      };
    default:
      return state;
  }
};
const rangeFilterReducer = (state = rangeFilter, action) => {
  switch (action.type) {
    case "SET_RANGE_FILTER":
      return {
        ...state,
        rangeFilter: action.payload,
      };
    default:
      return state;
  }
};
const selectedParkReducer = (state = selectedPark, action) => {
  switch (action.type) {
    case "SET_SELECTED_PARK":
      return {
        ...state,
        selectedPark: action.payload,
      };
    default:
      return state;
  }
};
const closeResultsReducer = (state = closeResults, action) => {
  switch (action.type) {
    case "SET_CLOSE_RESULTS":
      return {
        ...state,
        closeResults: action.payload,
      };
    default:
      return state;
  }
};
const sortingReducer = (state = sortingValue, action) => {
  switch (action.type) {
    case "SET_SORTING_VALUE":
      return {
        ...state,
        sortingValue: action.payload,
      };
    default:
      return state;
  }
};
const popupAnimalReducer = (state = popupAnimal, action) => {
  switch (action.type) {
    case "SET_POPUP_ANIMAL":
      return {
        ...state,
        popupAnimal: action.payload,
      };
    default:
      return state;
  }
};
const activeParkReviewsReducer = (state = activeParkReviews, action) => {
  switch (action.type) {
    case "SET_ACTIVE_PARK_REVIEWS":
      return {
        ...state,
        activeParkReviews: action.payload,
      };

    case "ADD_ACTIVE_PARK_REVIEW":
      return {
        activeParkReviews: [...state.activeParkReviews, action.payload],
      };
    case "REMOVE_ACTIVE_PARK_REVIEW":
      return {
        activeParkReviews: [
          ...state.activeParkReviews.filter(
            (review) => review.id !== action.payload
          ),
        ],
      };
    default:
      return state;
  }
};

const markerDisplayReducer = (state = markerDisplay, action) => {
  switch (action.type) {
    case "SET_ANIMAL_DISPLAY":
      return {
        ...state,
        animals: action.payload.animals,
      };
    case "SET_PARKS_DISPLAY":
      return {
        ...state,
        parks: action.payload.parks,
      };
    case "SET_RESOURCES_DISPLAY":
      return {
        ...state,
        resources: action.payload.resources,
      };
    case "SET_ANIMAL_RADIUS_DISPLAY":
      return {
        ...state,
        animalRadius: action.payload.animalRadius,
      };

    default:
      return state;
  }
};
const popupResourceReducer = (state = popupResource, action) => {
  switch (action.type) {
    case "SET_POPUP_RESOURCE":
      return {
        ...state,
        popupResource: action.payload,
      };
    default:
      return state;
  }
};

const markerPositionReducer = (state = markerPosition, action) => {
  switch (action.type) {
    case "SET_MARKER_POSITION":
      return {
        ...state,
        latitude: action.payload.lat,
        longitude: action.payload.lng,
      };
    default:
      return state;
  }
};

const selectedAnimalReducer = (state = selectedAnimal, action) => {
  switch (action.type) {
    case "SET_SELECTED_ANIMAL":
      return {
        ...state,
        selectedAnimal: action.payload,
      };
    default:
      return state;
  }
};
const selectedResourceReducer = (state = selectedResource, action) => {
  switch (action.type) {
    case "SET_SELECTED_RESOURCE":
      return {
        ...state,
        selectedResource: action.payload,
      };
    default:
      return state;
  }
};

const loadReducer = (state = loaded, action) => {
  switch (action.type) {
    case "SET_LOAD":
      return {
        ...state,
        didLoad: action.payload,
      };
    default:
      return state;
  }
};

const parksReducer = (state = allParks, action) => {
  switch (action.type) {
    case "SET_PARKS":
      return {
        ...state,
        parks: action.payload,
      };
    case "CLEAR_PARKS":
      return {
        ...state,
        parks: [],
      };

    case "UPDATE_PARK_RATING":
      return {
        ...state,
        parks: state.parks.map((park) => {
          if (park.parkCode === action.payload.parkCode) {
            return { ...park, average_rating: action.payload.overall };
          }
          return park;
        }),
      };
    default:
      return state;
  }
};

const animalSightingsReducer = (state = animalSightings, action) => {
  switch (action.type) {
    case "SET_ANIMAL_SIGHTINGS":
      return {
        ...state,
        animalSightings: action.payload,
      };

    case "ADD_ANIMAL_SIGHTINGS":
      return {
        animalSightings: [...state.animalSightings, action.payload],
      };
    case "CLEAR_ANIMAL_SIGHTINGS":
      return {
        ...state,
        animalSightings: [],
      };

    default:
      return state;
  }
};
const resourceSightingsReducer = (state = resourceSightings, action) => {
  switch (action.type) {
    case "SET_RESOURCE_SIGHTINGS":
      return {
        ...state,
        resourceSightings: action.payload,
      };

    case "ADD_RESOURCE_SIGHTINGS":
      return {
        resourceSightings: [...state.resourceSightings, action.payload],
      };
    case "CLEAR_RESOURCE_SIGHTINGS":
      return {
        ...state,
        resourceSightings: [],
      };

    default:
      return state;
  }
};

const searchReducer = (state = searchValue, action) => {
  switch (action.type) {
    case "SEARCH_PARKS":
      return {
        ...state,
        searchPhrase: action.payload.searchPhrase,
      };
    default:
      return state;
  }
};

const userLocationReducer = (state = userLocation, action) => {
  switch (action.type) {
    case "SET_NEW_USER_LOCATION":
      return {
        ...state,
        latitude: action.payload.lat,
        longitude: action.payload.long,
      };

    default:
      return state;
  }
};

const viewportReducer = (state = mapViewport, action) => {
  switch (action.type) {
    case "SET_NEW_VIEWPORT":
      const { latitude, longitude, zoom } = action.payload;
      return {
        ...state,
        latitude,
        longitude,
        zoom,
      };
    default:
      return state;
  }
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SET_USER_INFORMATION":
      const {
        id,
        full_name,
        email,
        address,
        city,
        us_state,
        zipcode,
        photo,
        username,
      } = action.payload.user;
      return {
        ...state,
        id,
        full_name,
        email,
        address,
        city,
        us_state,
        zipcode,
        photo,
        username,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        ...state,
        id: 0,
        full_name: "",
        email: "",
        address: "",
        city: "",
        us_state: "",
        zipcode: 0,
        username: "",
        token: "",
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  userInformation: userReducer,
  newViewport: viewportReducer,
  userLocation: userLocationReducer,
  allParks: parksReducer,
  searchValue: searchReducer,
  loaded: loadReducer,
  selectedPark: selectedParkReducer,
  selectedAnimal: selectedAnimalReducer,
  selectedResource: selectedResourceReducer,
  markerPosition: markerPositionReducer,
  animalSightings: animalSightingsReducer,
  resourceSightings: resourceSightingsReducer,
  popupAnimal: popupAnimalReducer,
  popupResource: popupResourceReducer,
  markerDisplay: markerDisplayReducer,
  activeParkReviews: activeParkReviewsReducer,
  sortingValue: sortingReducer,
  closeResults: closeResultsReducer,
  ratingFilter: ratingFilterReducer,
  rangeFilter: rangeFilterReducer,
  animalResourceSelector: animalResourceReducer,
});
const storeObject = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); // when creating a store, must always create it with a reducer fn

ReactDOM.render(
  <Provider store={storeObject}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

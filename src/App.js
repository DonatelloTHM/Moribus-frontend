import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import Profile from "./Profile/Profile";
import MainPage from "./MainPage/MainPage";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { useDispatch, useSelector } from "react-redux";
import bvideo from "./backgroundvideo.mp4";

function App() {
  const loggedIn = useSelector((state) => state.userInformation.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      persistLoggedInUser();
    }
  }, []);

  const location = useLocation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let setUserLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      dispatch({ type: "SET_NEW_USER_LOCATION", payload: setUserLocation });
    });
  }, []);

  const persistLoggedInUser = () => {
    fetch("http://localhost:3000/persist", {
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_USER_INFORMATION", payload: result });
        localStorage.token = result.token;
      });
  };

  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>
        <Route path="/register" exact>
          {loggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login" exact>
          {loggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>

      {location.pathname === "/main" ? null : (
        <>
          <video className="videoTag" autoPlay loop muted>
            <source src={bvideo} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </>
      )}
    </div>
  );
}

export default App;

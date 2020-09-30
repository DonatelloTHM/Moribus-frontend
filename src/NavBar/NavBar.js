import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import "./NavBar.scss";
import { ReactComponent as MoribusText } from "./moribustext.svg";
import { ReactComponent as MoribusABS } from "./moribusabs.svg";

function NavBar() {
  const userToken = useSelector((state) => state.userInformation.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const handleLogout = () => {
    localStorage.clear("token");
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  return (
    <div className={location.pathname === "/main" ? "navbarabs" : "navbar"}>
      {location.pathname === "/main" ? (
        <MoribusABS
          className="moribus flip-in-ver-right"
          onClick={(e) => {
            history.push("/");
          }}
        />
      ) : (
        <MoribusText className="moribus flip-in-ver-right" />
      )}
      <NavLink
        exact={true}
        activeClassName="link-active"
        className="link-navbar"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        exact={true}
        activeClassName="link-active"
        className="link-navbar"
        to="/main"
      >
        Map
      </NavLink>
      <NavLink
        exact={true}
        activeClassName="link-active"
        className="link-navbar"
        to="/"
      >
        About
      </NavLink>
      {userToken ? null : (
        <NavLink
          activeClassName="link-active"
          className="link-navbar"
          to="/login"
        >
          Login
        </NavLink>
      )}
      {userToken ? null : (
        <NavLink
          activeClassName="link-active"
          className="link-navbar"
          to="/register"
        >
          Register
        </NavLink>
      )}
      {userToken && (
        <h1 onClick={handleLogout} className="logout">
          Logout
        </h1>
      )}
    </div>
  );
}

export default NavBar;

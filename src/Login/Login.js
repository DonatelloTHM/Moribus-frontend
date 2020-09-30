import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginError, setLoginError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const something = useSelector((state) => state.userInformation);
  console.log(something);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          handleError(result);
        } else {
          handleResponse(result);
        }
      });
  };

  const handleError = (result) => {
    setLoginError(result.error);
  };

  const handleResponse = (response) => {
    localStorage.token = response.token;
    dispatch({ type: "SET_USER_INFORMATION", payload: response });
    history.go(-1);
  };

  return (
    <div className="login slide-in-fwd-center">
      <div className="login-container">
        <div className="topimage"></div>

        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            className={
              loginError
                ? "login-inputs login-error shake-horizontal"
                : "login-inputs"
            }
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className={
              loginError
                ? "login-inputs login-error shake-horizontal"
                : "login-inputs"
            }
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {loginError ? <h5>Wrong Credentials</h5> : null}
          <input className="login-button" type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./Register.scss";

function Register(props) {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    address: "",
    city: "",
    us_state: "",
    zipcode: 0,
  });

  const [resourcePhoto, setResourcePhoto] = useState({});
  const [resourceURL, setResourceURL] = useState("");

  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("password_confirmation", form.password_confirmation);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("city", form.city);
    formData.append("us_state", form.us_state);
    formData.append("zipcode", form.zipcode);
    formData.append("photo", resourcePhoto);

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        handleResponse(result);
      });
  };

  const handleResponse = (resp) => {
    if (resp.error) {
      alert(resp.error);
    } else {
      localStorage.token = resp.token;
      props.setUserInformation(resp);
      history.push("/");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setResourceURL(URL.createObjectURL(e.target.files[0]));
    setResourcePhoto(e.target.files[0]);
  };

  return (
    <div className="register slide-in-fwd-center">
      <div className="image-form-container">
        <div className="sidepic scale-in-hor-right">
          {resourceURL ? <img src={resourceURL} alt="resource" /> : null}
        </div>
        <form onSubmit={handleRegister}>
          <div className="register-user">
            <h1>User Info</h1>
            <input
              className="register-input"
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Full Name"
            />
            <input
              className="register-input"
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            <div className="same-row-input">
              <input
                className="register-input"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Password"
              />
              <input
                className="register-input"
                onChange={handleChange}
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
              />
            </div>
            <input
              className="register-input"
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Email"
            />
            <label className="photo-upload-label fade-in" htmlFor="image">
              Add an image
              <input
                id="image"
                type="file"
                name="image"
                onChange={handleImage}
              />
            </label>
          </div>
          <div className="register-address">
            <h1>Address</h1>
            <input
              className="register-input"
              onChange={handleChange}
              type="text"
              name="address"
              placeholder="Street Address"
            />
            <input
              className="register-input"
              onChange={handleChange}
              type="text"
              name="city"
              placeholder="City"
            />
            <div className="same-row-input">
              <input
                className="register-input"
                onChange={handleChange}
                type="text"
                name="us_state"
                placeholder="State"
              />
              <input
                className="register-input"
                onChange={handleChange}
                type="number"
                name="zipcode"
                placeholder="Zip Code"
              />
            </div>
          </div>

          <input className="submit-button" type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}
const setUserInformation = (userInfo) => {
  return {
    type: "SET_USER_INFORMATION",
    payload: userInfo,
  };
};

const mapDispatchToProps = { setUserInformation };

export default connect(null, mapDispatchToProps)(Register);

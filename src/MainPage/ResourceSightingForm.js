import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ResourceSightingForm.scss";
import swal from "sweetalert";

const ResourceSightingForm = () => {
  const markerPosition = useSelector((state) => state.markerPosition);
  const { longitude, latitude } = markerPosition;
  const dispatch = useDispatch();
  const selectedResource = useSelector(
    (state) => state.selectedResource.selectedResource
  );

  const [closestPark, setclosestPark] = useState({
    first: "",
    second: "",
    third: "",
  });

  const [resourcePhoto, setResourcePhoto] = useState({});
  const [resourceURL, setResourceURL] = useState("");
  const [parkSelected, setparkSelected] = useState(closestPark.first);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", resourcePhoto);
    form.append("latitude", latitude);
    form.append("longitude", longitude);
    form.append("park", parkSelected);
    form.append("resource", selectedResource);

    fetch("http://localhost:3000/resource_sightings", {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.token}`,
      },
      body: form,
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_SELECTED_RESOURCE", payload: "" });
        dispatch({ type: "ADD_RESOURCE_SIGHTINGS", payload: result });
        dispatch({
          type: "SET_ANIMAL_RESOURCE_SELECTOR",
          payload: { animal: false, resource: false },
        });
        swal({
          title: "Success!",
          text: "Your resource sighting submission was succesful!",
          icon: "success",
          button: "OK!",
        });
      });
  };

  const handleChange = (e) => {
    setparkSelected(e.target.value);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3000/closest_park?latitude=${latitude}&longitude=${longitude}`
    )
      .then((res) => res.json())
      .then((data) => {
        setclosestPark({
          first: data[0].name,
          second: data[1].name,
          third: data[2].name,
        });

        setparkSelected(data[0].name);
      });
  }, [longitude, latitude]);

  const handleImage = (e) => {
    setResourceURL(URL.createObjectURL(e.target.files[0]));
    setResourcePhoto(e.target.files[0]);
  };
  return (
    <div className="resource-sighting-form">
      <img
        src={
          resourceURL
            ? resourceURL
            : "https://lunawood.com/wp-content/uploads/2018/02/placeholder-image.png"
        }
        alt="resource"
      />
      <form onSubmit={handleSubmit}>
        <label className="photo-upload-label fade-in" htmlFor="image">
          Add an image
          <input id="image" type="file" name="image" onChange={handleImage} />
        </label>
        <div>
          <select onChange={handleChange} value={parkSelected} name="park">
            <option defaultValue={closestPark.first}>
              {longitude ? closestPark.first : "Updating..."}
            </option>
            <option value={closestPark.second}>{closestPark.second}</option>
            <option value={closestPark.third}>{closestPark.third}</option>
            <option value="outside">Other</option>
          </select>
          <input className="resource-submit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default ResourceSightingForm;

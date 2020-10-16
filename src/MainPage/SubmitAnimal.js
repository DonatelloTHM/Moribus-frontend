import React, { useEffect, useState } from "react";
import "./SubmitAnimal.scss";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

export default function SubmitAnimal() {
  const markerPosition = useSelector((state) => state.markerPosition);
  const { longitude, latitude } = markerPosition;
  const dispatch = useDispatch();
  const selectedAnimal = useSelector(
    (state) => state.selectedAnimal.selectedAnimal
  );

  const [closestPark, setclosestPark] = useState({
    first: "",
    second: "",
    third: "",
  });

  const [parkSelected, setparkSelected] = useState(closestPark.first);
  const handleSubmit = (e) => {
    e.preventDefault();
    const markerData = {
      latitude: latitude,
      longitude: longitude,
      animal: selectedAnimal,
      park: parkSelected,
    };
    dispatch({ type: "SET_SELECTED_ANIMAL", payload: "" });
    dispatch({
      type: "SET_ANIMAL_RESOURCE_SELECTOR",
      payload: { animal: false, resource: false },
    });

    fetch("http://localhost:3000/animal_sightings", {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(markerData),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "ADD_ANIMAL_SIGHTINGS", payload: result });
        swal({
          title: "Success!",
          text: "Your animal sighting submission was succesful!",
          icon: "success",
          button: "OK!",
        });
      });
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

  const handleChange = (e) => {
    setparkSelected(e.target.value);
  };

  return (
    <div className="submit-animal">
      <form onSubmit={handleSubmit}>
        <select onChange={handleChange} value={parkSelected} name="park">
          <option defaultValue={closestPark.first}>
            {longitude ? closestPark.first : "Updating..."}
          </option>
          <option value={closestPark.second}>{closestPark.second}</option>
          <option value={closestPark.third}>{closestPark.third}</option>
          <option value="outside">Other</option>
        </select>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

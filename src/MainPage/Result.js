import React from "react";
import { useDispatch } from "react-redux";
import "./Result.scss";
import { ReactComponent as Parks } from "./park.svg";

function Result({ parkObj }) {
  const dispatch = useDispatch();

  const handleHover = () => {
    dispatch({
      type: "SET_ANIMAL_RESOURCE_SELECTOR",
      payload: { animal: false, resource: false },
    });

    dispatch({ type: "SET_SELECTED_ANIMAL", payload: "" });
    dispatch({ type: "SET_SELECTED_RESOURCE", payload: "" });

    const newViewport = {
      latitude: parkObj.latitude,
      longitude: parkObj.longitude,
      zoom: 17,
    };
    dispatch({
      type: "SET_NEW_VIEWPORT",
      payload: newViewport,
    });
    dispatch({ type: "SET_SELECTED_PARK", payload: parkObj });
  };
  return (
    <div className="result-park" onClick={handleHover}>
      <Parks />
      {/* <img src={parkObj.image} alt="something" /> */}
      <div className="pllana">
        <h1>{parkObj.name}</h1>
        <h6>
          {parkObj.average_rating}
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </h6>
        <div className="donatello">
          <h2>{parkObj.usState}</h2>
          <p>{parkObj.distance} miles</p>
        </div>
      </div>
    </div>
  );
}

export default Result;

import React, { useState } from "react";
import "./Filter.scss";
import Toggle from "react-toggle";
import { useDispatch, useSelector } from "react-redux";
import "react-toggle/style.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

function Filter() {
  const dispatch = useDispatch();
  const sortingValue = useSelector((state) => state.sortingValue.sortingValue);
  const animalDisplay = useSelector((state) => state.markerDisplay.animals);
  const resourceDisplay = useSelector((state) => state.markerDisplay.resources);
  const parkDisplay = useSelector((state) => state.markerDisplay.parks);
  const animalRadius = useSelector((state) => state.markerDisplay.animalRadius);
  const ratingFilter = useSelector((state) => state.ratingFilter.ratingFilter);
  const rangeFilter = useSelector((state) => state.rangeFilter.rangeFilter);

  const [rangeController, setRangeController] = useState(0);

  const handleSorting = (e) => {
    dispatch({ type: "SET_SORTING_VALUE", payload: e.target.value });
  };

  const handleRating = (e) => {
    dispatch({ type: "SET_RATING_FILTER", payload: e });
  };

  const handleRange = (e) => {
    dispatch({ type: "SET_RANGE_FILTER", payload: rangeController });
  };

  const handleReset = (e) => {
    dispatch({ type: "SET_RATING_FILTER", payload: 0 });
    dispatch({ type: "SET_RANGE_FILTER", payload: 0 });
    setRangeController(0);
  };

  return (
    <div className="filter-map">
      <div className="filter-range">
        <h1>Select Range:</h1>
        <Slider
          value={rangeController}
          orientation="horizontal"
          onChange={setRangeController}
          onChangeComplete={handleRange}
          max={3000}
        />
      </div>
      <div className="filter-rating">
        <h1>Filter by Rating:</h1>
        <div
          className={ratingFilter === 5 ? "active-rating" : null}
          onClick={(e) => handleRating(5)}
        >
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </div>
        <div
          className={ratingFilter === 4 ? "active-rating" : null}
          onClick={(e) => handleRating(4)}
        >
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </div>
        <div
          className={ratingFilter === 3 ? "active-rating" : null}
          onClick={(e) => handleRating(3)}
        >
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </div>
        <div
          className={ratingFilter === 2 ? "active-rating" : null}
          onClick={(e) => handleRating(2)}
        >
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </div>
        <div
          className={ratingFilter === 1 ? "active-rating" : null}
          onClick={(e) => handleRating(1)}
        >
          <img
            alt="svgImg"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
            className="icon"
          />
        </div>
      </div>
      <div className="clear-filter">
        <button onClick={handleReset}>Reset Filters</button>
      </div>
      <div
        className={ratingFilter ? "active-rating" : null}
        className="sorting"
      >
        <h1>Sort By:</h1>
        <select onChange={handleSorting} value={sortingValue} name="park">
          <option defaultValue="ristance">Distance</option>
          <option value="rating">Rating</option>
          <option value="most">Most Animal Sightings</option>
          <option value="least">Least Animal Sightings</option>
        </select>
      </div>
      <div className="display-markers">
        <h1>Display Markers</h1>
        <div className="display-toggles">
          <label htmlFor="cheese-status">
            <Toggle
              id="cheese-status"
              defaultChecked={parkDisplay}
              onChange={(e) =>
                dispatch({
                  type: "SET_PARKS_DISPLAY",
                  payload: { parks: e.target.checked },
                })
              }
            />
            Parks
          </label>
          <label htmlFor="cheese-status">
            <Toggle
              id="cheese-status"
              defaultChecked={resourceDisplay}
              onChange={(e) =>
                dispatch({
                  type: "SET_RESOURCES_DISPLAY",
                  payload: { resources: e.target.checked },
                })
              }
            />
            Resources
          </label>
          <label htmlFor="cheese-status">
            <Toggle
              id="cheese-status"
              defaultChecked={animalDisplay}
              onChange={(e) =>
                dispatch({
                  type: "SET_ANIMAL_DISPLAY",
                  payload: { animals: e.target.checked },
                })
              }
            />
            Animals
          </label>
          <label htmlFor="cheese-status">
            <Toggle
              id="cheese-status"
              defaultChecked={animalRadius}
              onChange={(e) =>
                dispatch({
                  type: "SET_ANIMAL_RADIUS_DISPLAY",
                  payload: { animalRadius: e.target.checked },
                })
              }
            />
            Animal Radius
          </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;

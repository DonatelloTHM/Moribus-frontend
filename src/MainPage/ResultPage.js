import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ResultPage.scss";
import { ReviewForm } from "./ReviewForm";
import Rating from "react-rating";
import { DateTime } from "luxon";
import { ReactComponent as Delete } from "./svg/cancel.svg";
const states = require("us-state-converter");

export default function ResultPage() {
  const APIKEY = process.env.REACT_APP_NPS_API_KEY;
  const selectedPark = useSelector((state) => state.selectedPark.selectedPark);
  const dispatch = useDispatch();
  const reviews = useSelector(
    (state) => state.activeParkReviews.activeParkReviews
  );
  const loggedInUser = useSelector((state) => state.userInformation.username);

  const [showPark, setShowPark] = useState({
    name: "",
    description: "",
    operatingHours: {},
    weatherInfo: "",
    us_state: "",
    url: "",
  });

  const [overall, setOverall] = useState(3);

  const fullState = () => {
    const statesArray = showPark.us_state.split(",");
    const mappedStates = statesArray.map((state) => {
      return states.fullName(state);
    });
    return mappedStates.join(", ");
  };

  const openHours = () => {
    const fixedArray = [];
    const parkObj = showPark.operatingHours;
    for (const key in parkObj) {
      fixedArray.push([`${key}:`, `${parkObj[key]}`]);
    }
    return fixedArray.map((day) => {
      return (
        <li key={day[0]}>
          <span>{day[0]}</span>
          <span>{day[1]}</span>
        </li>
      );
    });
  };

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/parks?parkCode=${selectedPark.parkCode}&api_key=${APIKEY}`
    )
      .then((res) => res.json())
      .then((result) => {
        const park = result.data[0];
        console.log(park);
        setShowPark({
          ...showPark,
          name: park.fullName,
          description: park.description,
          operatingHours:
            park.operatingHours.length > 0
              ? park.operatingHours[0]["standardHours"]
              : {},
          weatherInfo: park.weatherInfo,
          us_state: park.states,
          url: park.url,
        });
      });
  }, [selectedPark.parkCode]);

  useEffect(() => {
    fetch(`http://localhost:3000/reviews?park_code=${selectedPark.parkCode}`)
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "SET_ACTIVE_PARK_REVIEWS", payload: data })
      );
  }, [selectedPark.parkCode]);

  useEffect(() => {
    fetch(
      `http://localhost:3000/average_reviews?park_code=${selectedPark.parkCode}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOverall(data.average);
        dispatch({
          type: "UPDATE_PARK_RATING",
          payload: { parkCode: selectedPark.parkCode, overall: data.average },
        });
      });
  }, [selectedPark.parkCode, reviews.length]);

  const renderReviews = () => {
    return reviews
      .map((review) => {
        return (
          <div
            key={review.id}
            className={
              loggedInUser === review.user.username
                ? "individual-review1"
                : "individual-review"
            }
          >
            <div className="review-header">
              <img
                className="reviewer-photo"
                src={review.user.photo}
                alt="user"
              />
              <div className="review-username">
                <h4>@{review.user.username}</h4>
                <h6>{DateTime.fromISO(review.created_at).toFormat("DDD")}</h6>
              </div>
              {loggedInUser === review.user.username ? (
                <Delete
                  onClick={(e) => deleteReview(review.id)}
                  className="delete-review"
                />
              ) : null}
              <Rating
                className="rating-result"
                initialRating={review.rating}
                readonly
                fullSymbol={
                  <img
                    alt="svgImg"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
                    className="icon"
                  />
                }
                emptySymbol={
                  <img
                    alt="svgImg"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjY2NjY2NjIj48cGF0aCBkPSJNODYsMTI5LjY1MjE3bDM1LjYxMTE3LDIxLjQ5MjgzYzUuNjE4NjcsMy4zODk4MyAxMi41NDg4MywtMS42NDgzMyAxMS4wNTgxNywtOC4wMzM4M2wtOS40NTI4MywtNDAuNTEzMTdsMzEuNDY4ODMsLTI3LjI2MmM0Ljk1OTMzLC00LjI5MjgzIDIuMzA3NjcsLTEyLjQ0MTMzIC00LjIyODMzLC0xMi45OTMxN2wtNDEuNDIzMzMsLTMuNTExNjdsLTE2LjIwMzgzLC0zOC4yMzQxN2MtMi41NTg1LC02LjAyNzE3IC0xMS4xMDExNywtNi4wMjcxNyAtMTMuNjU5NjcsMGwtMTYuMjAzODMsMzguMjM0MTdsLTQxLjQyMzMzLDMuNTExNjdjLTYuNTM2LDAuNTUxODMgLTkuMTg3NjcsOC43MDAzMyAtNC4yMjgzMywxMi45OTMxN2wzMS40Njg4MywyNy4yNjJsLTkuNDUyODMsNDAuNTEzMTdjLTEuNDkwNjcsNi4zODU1IDUuNDM5NSwxMS40MjM2NyAxMS4wNTgxNyw4LjAzMzgzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                    className="icon"
                  />
                }
              />
            </div>
            <div className="review-body">
              <h1>{review.subject}</h1>
              <p>{review.content}</p>
            </div>
          </div>
        );
      })
      .reverse();
  };

  const deleteReview = (id) => {
    fetch("http://localhost:3000/reviews/" + id, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => {
        dispatch({ type: "REMOVE_ACTIVE_PARK_REVIEW", payload: id });
      });
  };

  return (
    <div className="result-page">
      <h5>{selectedPark.distance} miles</h5>
      <img src={selectedPark.image} alt="somepark" />
      <div className="result-page-info">
        <h2>{fullState()}</h2>
        <h1>{showPark.name}</h1>
        <Rating
          className="overall-rating"
          initialRating={overall}
          readonly
          fractions={2}
          fullSymbol={
            <img
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBpZD0ib3JpZ2luYWwtaWNvbiIgZmlsbD0iI2ZmZDM2YiI+PHBhdGggZD0iTTg2LDEyOS42NTIxN2wzNS42MTExNywyMS40OTI4M2M1LjYxODY3LDMuMzg5ODMgMTIuNTQ4ODMsLTEuNjQ4MzMgMTEuMDU4MTcsLTguMDMzODNsLTkuNDUyODMsLTQwLjUxMzE3bDMxLjQ2ODgzLC0yNy4yNjJjNC45NTkzMywtNC4yOTI4MyAyLjMwNzY3LC0xMi40NDEzMyAtNC4yMjgzMywtMTIuOTkzMTdsLTQxLjQyMzMzLC0zLjUxMTY3bC0xNi4yMDM4MywtMzguMjM0MTdjLTIuNTU4NSwtNi4wMjcxNyAtMTEuMTAxMTcsLTYuMDI3MTcgLTEzLjY1OTY3LDBsLTE2LjIwMzgzLDM4LjIzNDE3bC00MS40MjMzMywzLjUxMTY3Yy02LjUzNiwwLjU1MTgzIC05LjE4NzY3LDguNzAwMzMgLTQuMjI4MzMsMTIuOTkzMTdsMzEuNDY4ODMsMjcuMjYybC05LjQ1MjgzLDQwLjUxMzE3Yy0xLjQ5MDY3LDYuMzg1NSA1LjQzOTUsMTEuNDIzNjcgMTEuMDU4MTcsOC4wMzM4M3oiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="
              className="icon"
            />
          }
          emptySymbol={
            <img
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjY2NjY2NjIj48cGF0aCBkPSJNODYsMTI5LjY1MjE3bDM1LjYxMTE3LDIxLjQ5MjgzYzUuNjE4NjcsMy4zODk4MyAxMi41NDg4MywtMS42NDgzMyAxMS4wNTgxNywtOC4wMzM4M2wtOS40NTI4MywtNDAuNTEzMTdsMzEuNDY4ODMsLTI3LjI2MmM0Ljk1OTMzLC00LjI5MjgzIDIuMzA3NjcsLTEyLjQ0MTMzIC00LjIyODMzLC0xMi45OTMxN2wtNDEuNDIzMzMsLTMuNTExNjdsLTE2LjIwMzgzLC0zOC4yMzQxN2MtMi41NTg1LC02LjAyNzE3IC0xMS4xMDExNywtNi4wMjcxNyAtMTMuNjU5NjcsMGwtMTYuMjAzODMsMzguMjM0MTdsLTQxLjQyMzMzLDMuNTExNjdjLTYuNTM2LDAuNTUxODMgLTkuMTg3NjcsOC43MDAzMyAtNC4yMjgzMywxMi45OTMxN2wzMS40Njg4MywyNy4yNjJsLTkuNDUyODMsNDAuNTEzMTdjLTEuNDkwNjcsNi4zODU1IDUuNDM5NSwxMS40MjM2NyAxMS4wNTgxNyw4LjAzMzgzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
              className="icon"
            />
          }
        />
        <h3>Description</h3>
        <p>{showPark.description}</p>
        <h3>Weather Information</h3>
        <p>{showPark.weatherInfo}</p>
        <h3>Operating Hours</h3>
        <ul>{openHours()}</ul>
        <h3>Information Website</h3>
        <a href={showPark.url}>{showPark.name} Website</a>
        <h3 id="reviews">Reviews</h3>
        {localStorage.token ? <ReviewForm /> : null}
        <div className="user_reviews">{renderReviews()}</div>
      </div>
    </div>
  );
}

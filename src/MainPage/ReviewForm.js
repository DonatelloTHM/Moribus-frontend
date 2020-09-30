import React, { useState } from "react";
import "./ReviewForm.scss";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";

export const ReviewForm = () => {
  const dispatch = useDispatch();
  const selectedPark = useSelector((state) => state.selectedPark.selectedPark);
  const [review, setReview] = useState({
    title: "",
    content: "",
  });
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rating);

    const newReview = {
      ...review,
      rating: rating,
      park_code: selectedPark.parkCode,
    };

    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        Authorization: `bearer ${localStorage.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "ADD_ACTIVE_PARK_REVIEW", payload: result });
        setReview({ title: "", content: "" });
        setRating(0);
      });
  };

  const handleReview = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="review-div">
      <form onSubmit={handleSubmit} className="review-form">
        <input
          onChange={handleReview}
          className="review-title"
          name="title"
          value={review.title}
          type="text"
          placeholder="Title"
        />
        <textarea
          onChange={handleReview}
          value={review.content}
          name="content"
          id=""
          cols="30"
          rows="4"
          placeholder="Review..."
        />
        <div className="rating-submit">
          <Rating
            className="rating"
            initialRating={rating}
            onClick={handleRating}
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
          <input className="review-submit" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

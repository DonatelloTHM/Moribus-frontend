import React from "react";
import SearchBar from "./SearchBar";
import "./HomePage.scss";
import { ReactComponent as MoribusLogo } from "./moribuslogo.svg";

function HomePage() {
  return (
    <div className="homepage">
      <div className="make-mark">
        <h1>Make your mark</h1>
        {/* <MoribusLogo /> */}
      </div>
      <h2>
        Look deep into nature, and then you will understand everything better
      </h2>
      <SearchBar />
    </div>
  );
}

export default HomePage;

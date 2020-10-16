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
        Tell me, what is it you plan to do with your one wild and precious life?
      </h2>
      <SearchBar />
    </div>
  );
}

export default HomePage;

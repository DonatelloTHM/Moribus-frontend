import React from "react";
import { Link } from "react-router-dom";
import "./AskLogin.scss";

export const AskLogin = () => {
  return (
    <div className="ask-login">
      <form>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </div>
  );
};

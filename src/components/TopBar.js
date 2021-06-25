// base imports
import React from "react";
import { useContext } from "react";

// routing imports
import { withRouter, Redirect } from "react-router";

// firebase imports
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";

const TopBar = ({ history }) => {
  // for logging out
  const handleLogout = () => {
    fire.auth().signOut();
  };

  const toAccountPage = () => history.push("/account");

  // get user info to pass to database
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <h1>Welcome, {currentUser.displayName}</h1>
        {/* <h2>It is currently...</h2> */}
      </div>

      <div className="topbar-right">
        <button className="topbar-btn" onClick={toAccountPage}>
          My Account
        </button>
        <button className="topbar-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default withRouter(TopBar);

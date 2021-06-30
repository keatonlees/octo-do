import React from "react";
import { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router";
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";
import moment from "moment";

import "./TopBar.css";

const TopBar = ({ history }) => {
  const [time, setTime] = useState(moment().format("h:mm A"));

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(moment().format("h:mm A"));
    }, 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });

  const handleLogout = () => fire.auth().signOut();
  const toAccountPage = () => history.push("/account");

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <h1>Welcome, {currentUser.displayName}</h1>
        <h3>It is currently {time}</h3>
      </div>
      <div className="topbar-right">
        <button className="primary-btn topbar-btn" onClick={toAccountPage}>
          My Account
        </button>
        <button className="primary-btn topbar-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default withRouter(TopBar);

import React from "react";
import { useState, useContext } from "react";
// import Axios from "axios";
import { withRouter } from "react-router";
import { AuthContext } from "../firebase/Auth.js";
// import { BASE_API_URL } from "../utils/constants.js";

import "../styles/AccountPage.css";

import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

const AccountPage = ({ history }) => {
  // const endpoint = BASE_API_URL;

  const [nameEdit, setNameEdit] = useState(false);
  const [newName, setNewName] = useState("");
  // const [emailEdit, setEmailEdit] = useState(false);
  // const [newEmail, setNewEmail] = useState("");
  // const [emailError, setEmailError] = useState("");

  // const [dailyTimeEdit, setDailyTimeEdit] = useState(false);
  // const [startTime, setStartTime] = useState(0);
  // const [endTime, setEndTime] = useState(0);

  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   getDailyTimes();
  // }, []);

  // const clearErrors = () => {
  //   setEmailError("");
  //   setPasswordError("");
  // };

  const saveName = async () => {
    if (newName) await currentUser.updateProfile({ displayName: newName });
    setNameEdit(false);
  };

  // const saveDailyTimes = async () => {
  //   const { status, data } = await Axios.put(
  //     endpoint + `/updateDailyTimes/${currentUser.uid}/${startTime}/${endTime}`
  //   );
  //   if (status === 200) setDailyTimeEdit(false);
  //   else console.log(data);
  // };

  // const getDailyTimes = async () => {
  //   const { status, data } = await Axios.get(
  //     endpoint + `/dailyTimes/${currentUser.uid}`
  //   );
  //   if (status === 200) {
  //     setStartTime(data[0].start_time);
  //     setEndTime(data[0].end_time);
  //   } else console.log(data);
  // };

  const toHomePage = () => history.push("/");

  return (
    <div className="account-page">
      <div className="account-container">
        <h1> Your account </h1>
        <div className="account-info">
          <h1> Name </h1>
          {nameEdit ? (
            <div className="account-update">
              <input
                name="name"
                type="text"
                defaultValue={currentUser.displayName}
                placeholder="New name"
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <button onClick={saveName}>Save</button>
            </div>
          ) : (
            <div className="account-update">
              <p> {currentUser.displayName} </p>
              <button
                onClick={() => {
                  setNameEdit(true);
                }}
              >
                Edit
              </button>
            </div>
          )}

          <h1> Email </h1>
          <div className="account-update">
            <p> {currentUser.email} </p>
          </div>

          {/* <h1>Daily Times</h1>
          {dailyTimeEdit ? (
            <div className="account-update">
              <input
                name="start"
                type="number"
                defaultValue={startTime}
                placeholder="Start time"
                min="1"
                max="12"
                onChange={(event) => {
                  setStartTime(event.target.value);
                }}
              />
              <input
                name="end"
                type="number"
                defaultValue={endTime}
                placeholder="End time"
                min="1"
                max="12"
                onChange={(event) => {
                  setEndTime(event.target.value);
                }}
              />
              <button onClick={saveDailyTimes}>Save</button>
            </div>
          ) : (
            <div className="account-update">
              <p> {startTime}:00 AM </p>
              <p> to </p>
              <p> {endTime}:00 PM </p>
              <button
                onClick={() => {
                  setDailyTimeEdit(true);
                }}
              >
                Edit
              </button>
            </div>
          )} */}
        </div>
        <button className="primary-btn account-back-btn" onClick={toHomePage}>
          Back
        </button>
      </div>

      <img src={octopusWaveRev} className="flair flair-img-1" alt="octopus" />
      <img src={octopusSmile} className="flair flair-img-2" alt="octopus" />
      <img src={octopusWave} className="flair flair-img-3" alt="octopus" />
      <img src={octopusSmileRev} className="flair flair-img-4" alt="octopus" />
      <img src={octopusSmile} className="flair flair-img-5" alt="octopus" />
      <img src={octopusSmileRev} className="flair flair-img-6" alt="octopus" />
      <img src={octopusWaveRev} className="flair flair-img-7" alt="octopus" />
      <img src={octopusWave} className="flair flair-img-8" alt="octopus" />
      <img src={octopusWaveRev} className="flair flair-img-9" alt="octopus" />
      <img src={octopusWave} className="flair flair-img-10" alt="octopus" />
      <img src={octopusSmile} className="flair flair-img-11" alt="octopus" />
      <img src={octopusSmileRev} className="flair flair-img-12" alt="octopus" />
      <img src={octopusWaveRev} className="flair flair-img-13" alt="octopus" />
      <img src={octopusSmile} className="flair flair-img-14" alt="octopus" />
    </div>
  );
};

export default withRouter(AccountPage);

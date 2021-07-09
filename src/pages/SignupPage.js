import React from "react";
import { useState, useCallback } from "react";
import Axios from "axios";
import { withRouter } from "react-router";
import fire from "../firebase/Fire.js";
import { BASE_API_URL } from "../utils/constants.js";

import "./LoginSignupPages.css";

import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

const SignupPage = ({ history }) => {

  const endpoint = BASE_API_URL;  const [firstName, setFirstName] = useState("");
  
  const [firstNameError, setFirstNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  const clearErrors = () => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmationError("");
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      clearErrors();

      if (!firstName) {
        setFirstNameError("Please fill out this field");
        return;
      }
      if (password !== passwordConfirmation) {
        setPasswordConfirmationError("Passwords do not match");
        return;
      }

      try {
        await fire.auth().createUserWithEmailAndPassword(email, password);
        await fire.auth().currentUser.updateProfile({ displayName: firstName });
        await addUserToDB(fire.auth().currentUser.uid);
        await addDefaultTimes(fire.auth().currentUser.uid);
        history.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
          default:
            break;
        }
      }
    },
    [history, firstName, email, password, passwordConfirmation]
  );

  const addUserToDB = async (uid) => {
    const { status, data } = await Axios.post(
      endpoint + `/addUser/${firstName}/${uid}`
    );
    if (status === 200) console.log("User added!");
    else console.log(data);
  };

  const addDefaultTimes = async (uid) => {
    const { status, data } = await Axios.post(
      endpoint + `/addDefaultTimes/${uid}`
    );
    if (status === 200) console.log("Default times added!");
    else console.log(data);
  };

  const toLoginPage = () => history.push("/login");

  return (
    <div className="log-sign-page">
      <div className="log-sign-container">
        <div className="log-sign-left">
          <img
            src={octopusWaveRev}
            className="log-sign-img"
            alt="octopus-waving"
          />
          <h1 className="log-sign-title">Octo-Do</h1>
        </div>
        <div className="log-sign-right">
          <h1 className="log-sign-title">Sign up</h1>
          <form className="log-sign-form" onSubmit={handleSignUp}>
            <div className="log-sign-inputs">
              <label>First name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <p className="log-sign-error"> {firstNameError} </p>
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <p className="log-sign-error"> {emailError} </p>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <p className="log-sign-error"> {passwordError} </p>
              <label>Password Confirmation</label>
              <input
                name="password"
                type="password"
                placeholder="Retype Password"
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
              />
              <p className="log-sign-error"> {passwordConfirmationError} </p>
            </div>
            <button type="submit" className="primary-btn log-sign-btn">
              Sign up
            </button>
          </form>
          <div className="log-sign-text">
            <h1>Already have an account?</h1>
            <button onClick={toLoginPage}>
              <u>Login</u>
            </button>
          </div>
        </div>
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

export default withRouter(SignupPage);

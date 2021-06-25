// base imports
import React from "react";
import { useCallback, useState } from "react";
import Axios from "axios";

// routing imports
import { withRouter } from "react-router";

// firebase imports
import fire from "../firebase/Fire.js";

// for axios endpoint
import { BASE_API_URL } from "../utils/constants.js";

// images
import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

const SignupPage = ({ history }) => {
  // node/express server endpoint
  const endpoint = BASE_API_URL;

  // global state variables
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");

  // clear errors
  const clearErrors = () => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmationError("");
  };

  // sign user up
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
        history.push("/");
      } catch (error) {
        // alert(error);
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

  const toLoginPage = () => history.push("/login");

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left">
          <img
            src={octopusWaveRev}
            className="signup-img"
            alt="octopus-waving"
          />
          <h1>Octo-Do</h1>
        </div>

        <div className="signup-right">
          <h1>Sign Up</h1>
          <form className="signup-form" onSubmit={handleSignUp}>
            <div className="signup-inputs">
              <label>First name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <p className="signup-error">{firstNameError}</p>

              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <p className="signup-error">{emailError}</p>

              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <p className="signup-error">{passwordError}</p>

              <label>Password Confirmation</label>
              <input
                name="password"
                type="password"
                placeholder="Retype Password"
                onChange={(event) => {
                  setPasswordConfirmation(event.target.value);
                }}
              />
              <p className="signup-error">{passwordConfirmationError}</p>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <div className="signup-text">
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

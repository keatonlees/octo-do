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
import octopusWave from "../images/octopus_waving_reversed.png";

const SignupPage = ({ history }) => {
  // node/express server endpoint
  const endpoint = BASE_API_URL;

  // global state variables
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // clear errors
  const clearErrors = () => {
    setFirstNameError("");
    setEmailError("");
    setPasswordError("");
  };

  // sign user up
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      clearErrors();

      if (!firstName) {
        // console.log("Please fill out this field");
        setFirstNameError("Please fill out this field");
        return;
      }

      try {
        await fire.auth().createUserWithEmailAndPassword(email, password);
        await fire.auth().currentUser.updateProfile({ displayName: firstName });
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
    [email, password, firstName, history]
  );

  const toLoginPage = () => history.push("/login");

  const addUserToDB = async () => {
    const { status, data } = await Axios.get(endpoint + "/test");
    if (status === 200) console.log(status, data);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={octopusWave} className="signup-img" alt="octopus-waving" />
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
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <button onClick={addUserToDB}>Get info</button>

        <div className="signup-text">
          <h1>Already have an account?</h1>
          <button onClick={toLoginPage}>
            <u>Login</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignupPage);

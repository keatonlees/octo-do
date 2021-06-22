// base imports
import React from "react";
import { useCallback, useContext, useState } from "react";

// routing imports
import { withRouter, Redirect } from "react-router";

// firebase imports
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";

// images
import octopusSmile from "../images/octopus_smiling_reversed.png";

const LoginPage = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // clear errors
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // log user in
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      clearErrors();
      try {
        await fire.auth().signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        // alert(error);
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
            break;
          default:
            break;
        }
      }
    },
    [email, password, history]
  );

  const toSignupPage = () => history.push("/signup");

  const { currentUser } = useContext(AuthContext);
  if (currentUser) return <Redirect to="/" />;

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={octopusSmile} className="login-img" alt="octopus-smiling"/>
        <h1>Octo-Do</h1>
      </div>

      <div className="login-right">
        <h1>Login</h1>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-inputs">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <p className="login-error">{emailError}</p>

            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <p className="login-error">{passwordError}</p>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-text">
          <h1>New to Octo-Do?</h1>
          <button onClick={toSignupPage}>
            <u>Sign Up</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);

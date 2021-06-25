// base imports
import React from "react";
import { useCallback, useContext, useState } from "react";

// routing imports
import { withRouter, Redirect } from "react-router";

// firebase imports
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";

// images
import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

const AccountPage = ({ history }) => {
  const [nameEdit, setNameEdit] = useState(false);
  const [emailEdit, setEmailEdit] = useState(false);
  const [passwordEdit, setPasswordEdit] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // clear errors
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const saveName = async () => {
    if (newName) await currentUser.updateProfile({ displayName: newName });
    setNameEdit(false);
  };

  //   const saveEmail = useCallback(
  //     async (event) => {
  //       event.preventDefault();
  //       clearErrors();

  //       try {
  //         await currentUser.updateEmail(newEmail);
  //         setEmailEdit(false);
  //       } catch (error) {
  //         alert(error);
  //         switch (error.code) {
  //           case "auth/invalid-email":
  //           case "auth/email-already-in-use":
  //             setEmailError(error.message);
  //             break;
  //           default:
  //             break;
  //         }
  //       }
  //     },
  //     [newEmail]
  //   );

  const toHomePage = () => history.push("/");
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="account-page">
      <div className="account-container">
        <h1>Your account</h1>

        <div className="account-info">
          <h1>Name</h1>
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
              <p>{currentUser.displayName}</p>
              <button
                onClick={() => {
                  setNameEdit(true);
                }}
              >
                Edit
              </button>
            </div>
          )}

          <h1>Email</h1>
          {emailEdit ? (
            <div className="account-update">
              {/* <input
              name="email"
              type="email"
              defaultValue={currentUser.email}
              placeholder="New email"
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
            <button onClick={saveEmail}>Save</button>
            <p className="signup-error">{emailError}</p> */}
            </div>
          ) : (
            <div className="account-update">
              <p>{currentUser.email}</p>
              {/* <button
              onClick={() => {
                setEmailEdit(true);
              }}
            >
              Edit
            </button> */}
            </div>
          )}

          {/* <h1>Password</h1>
        <div className="account-update">
          <button>Change Password</button>
        </div> */}
        </div>

        <button className="account-back-btn" onClick={toHomePage}>
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

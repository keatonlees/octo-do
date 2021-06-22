// base imports
import React from "react";
import { useContext } from "react";

// firebase imports
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";

function HomePage() {
  // for logging out
  const handleLogout = () => {
    fire.auth().signOut();
  };

  // get user info to pass to database
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  // for axios endpoint
  // import { BASE_API_URL } from "./utils/Constants.js";
  // const endpoint = BASE_API_URL;

  return (
    <>
      <h1>Welcome, {currentUser.displayName}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default HomePage;

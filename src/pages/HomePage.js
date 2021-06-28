// base imports
import React from "react";
import { useContext } from "react";

// firebase imports
import fire from "../firebase/Fire.js";
import { AuthContext } from "../firebase/Auth.js";

import TopBar from "../components/TopBar.js";
import AllTasks from "../components/AllTasks.js";
import DailyTasks from "../components/DailyTasks.js";

// css
import "./HomePage.css";

// images
import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

function HomePage() {
  // get user info to pass to database
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-top">
          <TopBar />
        </div>
        <div className="home-bottom">
          <div className="home-left">
            <DailyTasks />
          </div>
          <div className="home-right">
            <AllTasks />
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
      <img src={octopusSmile} className="flair flair-img-15" alt="octopus" />
    </div>
  );
}

export default HomePage;

import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import { DragDropContext } from "react-beautiful-dnd";

import TopBar from "../components/TopBar.js";
import AllTasks from "../components/AllTasks.js";
import DailyTasks from "../components/DailyTasks.js";

import "./HomePage.css";

import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

function HomePage() {
  const endpoint = BASE_API_URL;

  const [allTaskList, setAllTaskList] = useState([]);
  const [dailyTaskList, setDailyTaskList] = useState([]);
  const daily_time_start = 7;
  const daily_time_end = 23;

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const { status, data } = await Axios.get(
      endpoint + `/allTasks/${currentUser.uid}`
    );
    if (status === 200) setAllTaskList(data);
    else console.log(data);
  };

  const getDailyTasksFromTime = async () => {
    const data_storage = [];
    for (let i = daily_time_start; i < daily_time_end + 1; i++) {
      const { status, data } = await Axios.get(
        endpoint + `/dailyTasksFromTime/${currentUser.uid}/${i}`
      );
      if (status === 200) data_storage.push(data);
      else console.log(data);
    }
    setDailyTaskList(data_storage);
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination) console.log(source, destination);
    // addToDaily(allTaskList[source.index], destination.droppableId);
  };

  const addToDaily = async (task_id, time_slot) => {
    const { status, data } = await Axios.post(
      endpoint + `/addToDaily/${currentUser.uid}/${task_id}/${time_slot}`
    );
    if (status === 200) console.log(data);
    else console.log(data);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-top">
          <TopBar />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="home-bottom">
            <div className="home-left">
              <DailyTasks
                dailyTaskList={dailyTaskList}
                daily_time_start={daily_time_start}
              />
            </div>
            <div className="home-right">
              <AllTasks allTaskList={allTaskList} getAllTasks={getAllTasks} />
            </div>
          </div>
        </DragDropContext>
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

import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import { DragDropContext } from "react-beautiful-dnd";

import TopBar from "../components/TopBar.js";
import AllTasks from "../components/AllTasks.js";
import DailyTasks from "../components/DailyTasks.js";

import "../styles/HomePage.css";

import octopusSmile from "../images/octopus_smiling.png";
import octopusSmileRev from "../images/octopus_smiling_reversed.png";
import octopusWave from "../images/octopus_waving.png";
import octopusWaveRev from "../images/octopus_waving_reversed.png";

function HomePage() {
  const endpoint = BASE_API_URL;

  const [allTaskList, setAllTaskList] = useState([]);
  const [dailyTaskList, setDailyTaskList] = useState([]);

  const startTime = 7;
  const endTime = 23;
  // const [startTime, setStartTime] = useState(7);
  // const [endTime, setEndTime] = useState(23);

  const onLoad = true; // trick var so full daily list is only gotten once onLoad

  const [curHour, setCurHour] = useState(0);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    const getAllDailyTasks = async () => {
      const data_storage = [];
      for (let i = startTime; i < endTime + 1; i++) {
        const { status, data } = await Axios.get(
          endpoint + `/dailyTasksFromTime/${currentUser.uid}/${i}`
        );
        if (status === 200) data_storage.push(data);
        else console.log(data);
      }
      setDailyTaskList(data_storage);
    };

    getAllDailyTasks();
  }, [onLoad, endpoint, currentUser.uid]);

  const getAllTasks = async () => {
    const { status, data } = await Axios.get(
      endpoint + `/allTasks/${currentUser.uid}`
    );
    if (status === 200) setAllTaskList(data);
    else console.log(data);
  };

  // const getDailyTimes = async () => {
  //   const { status, data } = await Axios.get(
  //     endpoint + `/dailyTimes/${currentUser.uid}`
  //   );
  //   if (status === 200) {
  //     setStartTime(data[0].start_time);
  //     setEndTime(data[0].end_time + 12);
  //   } else console.log(data);
  // };

  const updateDailyTimeSlot = async (time_slot) => {
    const daily_list = dailyTaskList;
    const index = time_slot - startTime;
    const { status, data } = await Axios.get(
      endpoint + `/dailyTasksFromTime/${currentUser.uid}/${time_slot}`
    );
    if (status === 200) {
      daily_list.splice(index, 1, data);
      setDailyTaskList([]);
      setDailyTaskList(daily_list);
    } else console.log(data);
  };

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination)
      addToDaily(allTaskList[source.index].id, destination.droppableId);
  };

  const addToDaily = async (task_id, time_slot) => {
    const { status, data } = await Axios.post(
      endpoint + `/addToDaily/${currentUser.uid}/${task_id}/${time_slot}`
    );
    if (status === 200) updateDailyTimeSlot(time_slot);
    else console.log(data);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-top">
          <TopBar setCurHour={setCurHour} />
        </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="home-bottom">
            <div className="home-left">
              <DailyTasks
                dailyTaskList={dailyTaskList}
                setDailyTaskList={setDailyTaskList}
                curHour={curHour}
                daily_time_start={startTime}
                daily_time_end={endTime}
                updateDailyTimeSlot={updateDailyTimeSlot}
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

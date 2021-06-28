// base imports
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../firebase/Auth.js";

// for axios endpoint
import { BASE_API_URL } from "../utils/constants.js";

// css
import "./AllDailyTasks.css";

// components
import Popup from "./Popup.js";
import NewTask from "./NewTask.js";

function AllTasks() {
  // node/express server endpoint
  const endpoint = BASE_API_URL;

  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [allTaskList, setAllTaskList] = useState([]);

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

  const { currentUser } = useContext(AuthContext);

  return (
    <div className="all-tasks-container">
      <div className="all-tasks-content">
        <div className="all-tasks-topbar">
          <h1>Your Task List</h1>
          <button
            className="primary-btn all-tasks-topbar-btn"
            onClick={() => {
              setNewTaskPopup(true);
            }}
          >
            New <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <Popup trigger={newTaskPopup}>
          <NewTask closePopup={setNewTaskPopup} />
        </Popup>

        <div className="all-tasks-display">
          {allTaskList.map((data, map) => {
            return <p>{data.task_name}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export default AllTasks;

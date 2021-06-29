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
import EditTask from "./EditTask.js";

function AllTasks() {
  // node/express server endpoint
  const endpoint = BASE_API_URL;

  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [editTaskPopup, setEditTaskPopup] = useState(false);
  const [allTaskList, setAllTaskList] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(0);

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

  const deleteTask = async (task_id) => {
    const { status, data } = await Axios.delete(
      endpoint + `/deleteTask/${currentUser.uid}/${task_id}`
    );
    if (status === 200) getAllTasks();
    else console.log(data);
  };

  const handleOpenEdit = (task_id) => {
    setTaskToEdit(task_id);
    setEditTaskPopup(true);
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

        <Popup trigger={editTaskPopup}>
          <EditTask closePopup={setEditTaskPopup} taskID={taskToEdit} />
        </Popup>

        <div className="all-tasks-display">
          {allTaskList.map((data, map) => {
            return (
              <div className="all-tasks-row">
                <span className="all-tasks-col all-tasks-handle">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span className="all-tasks-col all-tasks-name">
                  <p className="all-tasks-name-text">{data.task_name}</p>
                </span>
                <span className="all-tasks-col all-tasks-date">
                  <p className="all-tasks-date-text">{data.task_date}</p>
                </span>
                <span className="all-tasks-col all-tasks-time">
                  <p className="all-tasks-time-text">{data.task_time}</p>
                </span>
                <span className="all-tasks-col all-tasks-edit">
                  <button
                    className="all-tasks-edit-btn"
                    onClick={() => {
                      handleOpenEdit(data.id);
                    }}
                  >
                    E
                  </button>
                </span>
                <span className="all-tasks-col all-tasks-delete">
                  <button
                    className="all-tasks-delete-btn"
                    onClick={() => {
                      deleteTask(data.id);
                    }}
                  >
                    X
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AllTasks;

import React from "react";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";

function EditTask(props) {
  const endpoint = BASE_API_URL;

  const [taskID, setTaskID] = useState(0);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");
  const [taskNameError, setTaskNameError] = useState("");

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getTaskFromID(props.taskID);
  }, []);

  const getTaskFromID = async (task_id) => {
    const { status, data } = await Axios.get(
      endpoint + `/task/${currentUser.uid}/${task_id}`
    );
    if (status === 200) setDefaultValues(data);
    else console.log(data);
  };

  const setDefaultValues = (data) => {
    document.getElementById("task-name-input").defaultValue = data[0].task_name;
    document.getElementById("task-date-input").defaultValue = data[0].task_date;
    document.getElementById("task-time-input").defaultValue = data[0].task_time;
    setTaskID(data[0].id);
    setNewTaskName(data[0].task_name);
    setNewTaskDate(data[0].task_date);
    setNewTaskTime(data[0].task_time);
  };

  const handleEditTask = async () => {
    if (!newTaskName) {
      setTaskNameError("Please enter a name");
      return;
    }
    await updateTaskInDB();
    closePopup();
  };

  const updateTaskInDB = async () => {
    const userUID = currentUser.uid;
    const { status, data } = await Axios.put(
      endpoint +
        `/updateTask/${userUID}/${taskID}/${newTaskName}/${newTaskDate}/${newTaskTime}`
    );
    if (status === 200) console.log("Task added!");
    else console.log(data);
  };

  const closePopup = () => props.closePopup(false);

  return (
    <div className="new-task-content">
      <h1>Edit task</h1>

      <form className="new-task-form" onSubmit={handleEditTask}>
        <div className="new-task-inputs">
          <label>Task name</label>
          <input
            id="task-name-input"
            type="text"
            placeholder="Task name"
            onChange={(event) => {
              setNewTaskName(event.target.value);
            }}
          />
          <p className="signup-error">{taskNameError}</p>

          <label>Task due date</label>
          <input
            id="task-date-input"
            type="date"
            onChange={(event) => {
              setNewTaskDate(event.target.value);
            }}
          />

          <label>Task due time</label>
          <input
            id="task-time-input"
            type="time"
            onChange={(event) => {
              setNewTaskTime(event.target.value);
            }}
          />
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={closePopup}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditTask;

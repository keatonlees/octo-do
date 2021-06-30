import React from "react";
import { useState, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import moment from "moment";

function NewTask(props) {
  const endpoint = BASE_API_URL;

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState(moment().format("YYYY-MM-DD"));
  const [taskTime, setTaskTime] = useState("12:00:00");
  const [taskNameError, setTaskNameError] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleNewTask = async () => {
    if (!taskName) {
      setTaskNameError("Please enter a name");
      return;
    }
    await addTaskToDB();
    closePopup();
  };

  const addTaskToDB = async () => {
    const userUID = currentUser.uid;
    const { status, data } = await Axios.post(
      endpoint + `/addTask/${userUID}/${taskName}/${taskDate}/${taskTime}`
    );
    if (status === 200) console.log("Task added!");
    else console.log(data);
  };

  const closePopup = () => props.closePopup(false);

  return (
    <div className="new-task-content">
      <h1>New task</h1>

      <form className="new-task-form" onSubmit={handleNewTask}>
        <div className="new-task-inputs">
          <label>Task name</label>
          <input
            name="task-name"
            type="text"
            placeholder="Task name"
            onChange={(event) => {
              setTaskName(event.target.value);
            }}
          />
          <p className="signup-error">{taskNameError}</p>

          <label>Task due date</label>
          <input
            name="task-date"
            type="date"
            onChange={(event) => {
              setTaskDate(event.target.value);
            }}
          />

          <label>Task due time</label>
          <input
            name="task-time"
            type="time"
            onChange={(event) => {
              setTaskTime(event.target.value);
            }}
          />
        </div>

        <button type="submit">Add</button>
        <button type="button" onClick={closePopup}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewTask;

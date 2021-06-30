import React from "react";
import { useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faMinus } from "@fortawesome/free-solid-svg-icons";

function DailyTasks({ dailyTaskList, daily_time_start }) {
  const endpoint = BASE_API_URL;

  dailyTaskList = [0, 1, 2, 3, 4, 5];

  const { currentUser } = useContext(AuthContext);

  const resetAllDailyTasks = async () => {
    const { status, data } = await Axios.delete(
      endpoint + `/resetAll/${currentUser.uid}`
    );
    if (status === 200) console.log(data);
    else console.log(data);
  };

  const resetDailyTask = async (task_id, time_slot) => {
    const { status, data } = await Axios.delete(
      endpoint + `/reset/${currentUser.uid}/${task_id}/${time_slot}`
    );
    if (status === 200) console.log(data);
    else console.log(data);
  };

  return (
    <div className="daily-tasks-container">
      <div className="daily-tasks-content">
        <div className="daily-tasks-topbar">
          <h1>Your Daily Tasks</h1>
          <button className="daily-tasks-topbar-btn">
            Reset <FontAwesomeIcon icon={faUndoAlt} />
          </button>
        </div>

        <div className="daily-tasks-display">
          {dailyTaskList.map((dailyTimeSlot, i) => {
            return (
              <div className="daily-tasks-row" key={i}>
                <div className="daily-tasks-col daily-tasks-time-display">
                  {i + daily_time_start}
                </div>

                <Droppable droppableId={`${i + daily_time_start}`}>
                  {(provided, snapshot) => (
                    <div
                      className="daily-tasks-col daily-tasks-item"
                      ref={provided.innerRef}
                    >
                      {dailyTimeSlot.length ? (
                        dailyTimeSlot.map((data, index) => {
                          return (
                            <div className="daily-tasks-item-content"></div>
                          );
                        })
                      ) : (
                        <div className="daily-tasks-empty-dropzone"></div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DailyTasks;

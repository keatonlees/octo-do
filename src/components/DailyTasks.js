import React from "react";
import { useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import { Droppable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt, faMinus } from "@fortawesome/free-solid-svg-icons";

function DailyTasks({
  dailyTaskList,
  setDailyTaskList,
  daily_time_start,
  daily_time_end,
  updateDailyTimeSlot,
}) {
  const endpoint = BASE_API_URL;

  const { currentUser } = useContext(AuthContext);

  const resetAllDailyTasks = async () => {
    const { status, data } = await Axios.delete(
      endpoint + `/resetAll/${currentUser.uid}`
    );
    if (status === 200) clearDailyList();
    else console.log(data);
  };

  const clearDailyList = () => {
    const data_storage = [];
    for (let i = daily_time_start; i < daily_time_end + 1; i++) {
      data_storage.push([]);
    }
    setDailyTaskList(data_storage);
  }

  const resetDailyTask = async (task_id, time_slot) => {
    const { status, data } = await Axios.delete(
      endpoint + `/reset/${currentUser.uid}/${task_id}/${time_slot}`
    );
    if (status === 200) updateDailyTimeSlot(time_slot);
    else console.log(data);
  };

  return (
    <div className="daily-tasks-container">
      <div className="daily-tasks-content">
        <div className="daily-tasks-topbar">
          <h1>Your Daily Tasks</h1>
          <button
            className="daily-tasks-topbar-btn"
            onClick={resetAllDailyTasks}
          >
            Reset <FontAwesomeIcon icon={faUndoAlt} />
          </button>
        </div>

        <div className="daily-tasks-display">
          {dailyTaskList.map((dailyTimeSlot, i) => {
            return (
              <div className="daily-tasks-row" key={i}>
                <div className="daily-tasks-col daily-tasks-time-display">
                  {i + daily_time_start > 12
                    ? i + daily_time_start - 12
                    : i + daily_time_start}
                  :00
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
                            <div className="daily-tasks-item-content">
                              <span className="daily-tasks-item-col">
                                <p>{data.task_name}</p>
                              </span>
                              <span className="daily-tasks-item-col">
                                <button
                                  className="daily-tasks-reset-btn"
                                  onClick={() => {
                                    resetDailyTask(
                                      data.id,
                                      i + daily_time_start
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                              </span>
                            </div>
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

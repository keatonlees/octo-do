import React, { useContext } from "react";
import { useState } from "react";
import Axios from "axios";
import { AuthContext } from "../firebase/Auth.js";
import { BASE_API_URL } from "../utils/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Droppable, Draggable } from "react-beautiful-dnd";

import "./AllDailyTasks.css";

import Popup from "./Popup.js";
import NewTask from "./NewTask.js";
import EditTask from "./EditTask.js";
import AllTaskItem from "./AllTaskItem.js";

function AllTasks({ allTaskList, getAllTasks }) {
  const endpoint = BASE_API_URL;

  const [newTaskPopup, setNewTaskPopup] = useState(false);
  const [editTaskPopup, setEditTaskPopup] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(0);

  const { currentUser } = useContext(AuthContext);

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

        <Droppable droppableId="all-tasks-display" isDropDisabled={true}>
          {(provided) => (
            <div className="all-tasks-display" ref={provided.innerRef}>
              {allTaskList.map((data, index) => {
                return (
                  <Draggable
                    key={data.id}
                    draggableId={data.task_name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={provided.draggableProps.style}
                          {...provided.dragHandleProps}
                        >
                          <AllTaskItem
                            data={data}
                            handleOpenEdit={handleOpenEdit}
                            deleteTask={deleteTask}
                          />
                        </div>
                        {snapshot.isDragging && !snapshot.isDropAnimating && (
                          <div>
                            <AllTaskItem
                              data={data}
                              handleOpenEdit={handleOpenEdit}
                              deleteTask={deleteTask}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

export default AllTasks;

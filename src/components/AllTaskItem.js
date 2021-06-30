import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function AllTaskItem({ data, handleOpenEdit, deleteTask }) {
  return (
    <div className="all-tasks-row">
      <span className="all-tasks-col all-tasks-handle">
        <FontAwesomeIcon icon={faBars} className="all-tasks-handle-bars" />
      </span>
      <span className="all-tasks-col all-tasks-name">
        <p className="all-tasks-name-text">{data.task_name}</p>
      </span>
      <span className="all-tasks-col all-tasks-date">
        <p className="all-tasks-date-text">
          {moment(data.task_date).format("MMMM Do, YYYY")}
        </p>
      </span>
      <span className="all-tasks-col all-tasks-time">
        <p className="all-tasks-time-text">
          {moment(data.task_time, "HH:mm:ss").format("h:mm A")}
        </p>
      </span>
      <span className="all-tasks-col all-tasks-edit">
        <button
          className="all-tasks-edit-btn"
          onClick={() => {
            handleOpenEdit(data.id);
          }}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </span>
      <span className="all-tasks-col all-tasks-delete">
        <button
          className="all-tasks-delete-btn"
          onClick={() => {
            deleteTask(data.id);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </span>
    </div>
  );
}

export default AllTaskItem;

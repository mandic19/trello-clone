import React from "react";
import "./Task.css";

const Task = ({ task }) => {
  const className = `task ${task.isDummyModel ? "sortable-ignore" : ""}`;

  return (
    <div className={className} data-id={task.id}>
      <div className="content">{task.name}</div>
      <div className="details"></div>
    </div>
  );
};

export default Task;

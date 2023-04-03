import React, { useState } from "react";
import TaskModal from "./components/modal/TaskModal";
import "./Task.css";

const Task = ({ task }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const className = `task ${task.isDummyModel ? "sortable-ignore" : ""}`;

  return (
    <>
      <div
        className={className}
        data-id={task.id}
        onClick={() => setIsModalOpened(true)}
      >
        <div className="content">{task.name}</div>
        <div className="details"></div>
      </div>
      <TaskModal
        task={task}
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </>
  );
};

export default Task;

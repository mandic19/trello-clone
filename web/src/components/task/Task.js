import React, { useState } from "react";
import TaskModal from "./components/modal/TaskModal";
import "./Task.css";

const Task = ({ task }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const onClickHandler = () => !task.isDummyModel && setIsModalOpened(true);

  return (
    <>
      <div
        className={`task ${task.isDummyModel ? "sortable-ignore" : ""}`}
        data-id={task.id}
        onClick={onClickHandler}
      >
        <div className="content">{task.name}</div>
        <div className="details"></div>
      </div>
      {isModalOpened && (
        <TaskModal task={task} onClose={() => setIsModalOpened(false)} />
      )}
    </>
  );
};

export default Task;

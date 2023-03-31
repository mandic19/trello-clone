import React, { useRef, useState } from "react";
import TaskModal from "./components/modal/TaskModal";
import "./Task.css";

const Task = ({ task }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const mDownClientX = useRef(null);
  const mDownClientY = useRef(null);

  const className = `task ${task.isDummyModel ? "sortable-ignore" : ""}`;

  const onMouseDownHandler = ({ clientX, clientY }) => {
    mDownClientX.current = clientX;
    mDownClientY.current = clientY;
  };

  const onMouseUpHandler = ({ clientX, clientY }) => {
    const movementX = Math.abs(mDownClientX.current - clientX);
    const movementY = Math.abs(mDownClientY.current - clientY);

    if (movementX > 0 || movementY > 0) return;

    setIsModalOpened(true);
  };

  return (
    <div
      className={className}
      data-id={task.id}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
    >
      <div className="content">{task.name}</div>
      <div className="details"></div>
      <TaskModal
        task={task}
        isOpen={isModalOpened}
        onClose={() => setIsModalOpened(false)}
      />
    </div>
  );
};

export default Task;

import React from "react";
import { connect } from "react-redux";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  updateSection,
  deleteSection,
} from "../../libs/redux/actions/sectionActions";
import {
  loadTasks,
  reorderTask,
  invalidateTasksState,
} from "../../libs/redux/actions/taskActions";
import Loader from "../loader/Loader";
import InputInline from "../input-inline/InputInline";
import SortableList from "../sortable/SortableList";
import Dropdown from "../dropdown/Dropdown";
import Task from "../task/Task";
import AddNewTask from "./components/add-new-task/AddNewTask";
import useSection from "./hooks/useSection";
import "./Section.css";

const Section = (props) => {
  const {
    section,
    tasks,
    form,
    isLoading,
    onChange,
    onSubmit,
    onBlur,
    onTaskDragEnd,
    getHamburgerMenuOptions,
  } = useSection(props);

  const className = `section-wrapper ${
    section.isDummyModel ? "sortable-ignore" : ""
  }`;

  return (
    <div className={className} data-id={section.id}>
      <div className="section">
        <div className="header">
          <div className="title">
            <InputInline
              name="name"
              value={form.fields.name.value}
              onChange={onChange}
              onSubmit={onSubmit}
              onBlur={onBlur}
              className="px-1 d-flex"
            />
          </div>
          <Dropdown items={getHamburgerMenuOptions()}>
            <div className="burger-menu sortable-ignore">
              <button className="btn btn-neutral btn-icon-only">
                <FontAwesomeIcon icon={faEllipsis} />
              </button>
            </div>
          </Dropdown>
        </div>
        {isLoading ? (
          <div className="loading">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="body">
            <SortableList
              data-id={section.id}
              className="task-container"
              options={{
                draggable: ".task",
                group: "task",
                onEnd: onTaskDragEnd,
              }}
            >
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </SortableList>
          </div>
        )}
        <div className="footer sortable-ignore">
          <AddNewTask section_id={section.id} order={tasks.length} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    tasks: state.tasks.filter((task) => task.section_id === props.section.id),
  };
};

const mapDispatchToProps = {
  updateSection,
  deleteSection,
  loadTasks,
  reorderTask,
  invalidateTasksState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);

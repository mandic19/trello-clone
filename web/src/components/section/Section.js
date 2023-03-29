import React from "react";
import { connect } from "react-redux";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateSection } from "../../libs/redux/actions/sectionActions";
import {
  loadTasks,
  invalidateTasksState,
} from "../../libs/redux/actions/taskActions";
import Loader from "../loader/Loader";
import InputInline from "../input-inline/InputInline";
import SortableList from "../sortable/Sortable";
import Task from "../task/Task";
import AddNewTask from "./components/add-new-task/AddNewTask";
import useSection from "./hooks/useSections";
import "./Section.css";

const Section = (props) => {
  const { section, tasks, form, isLoading, onChange, onSubmit, onBlur } =
    useSection(props);

  return (
    <div className="section-wrapper" data-id={section.id}>
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
          <div className="burger-menu">
            <button className="btn btn-neutral btn-icon-only">
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="loading">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="body">
            <SortableList draggable=".task" group="task">
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </SortableList>
          </div>
        )}
        <div className="footer sortable-ignore">
          <AddNewTask section_id={section.id} />
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
  loadTasks,
  invalidateTasksState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Section);

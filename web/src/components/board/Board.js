import React from "react";
import { connect } from "react-redux";
import { updateBoard } from "../../libs/redux/actions/boardActions";
import { invalidateSectionsState } from "../../libs/redux/actions/sectionActions";
import { reorderSection } from "../../libs/redux/actions/sectionActions";
import { reorderTask } from "../../libs/redux/actions/taskActions";
import InputInline from "../input-inline/InputInline";
import Section from "../section/Section";
import AddNewSection from "./components/add-new-section/AddNewSection";
import useBoard from "./hooks/useBoard";
import "./Board.css";
import SortableList from "../sortable/Sortable";

const Board = (props) => {
  const { board, boardSections, form, onChange, onSubmit, onBlur } =
    useBoard(props);

  return (
    <div className="board">
      <div className="header">
        <div className="title">
          <InputInline
            name="name"
            onSubmit={onSubmit}
            onBlur={onBlur}
            onChange={onChange}
            className="input-inline-wrapper px-2"
            value={form.fields.name.value}
          />
        </div>
      </div>
      <div className="body">
        <SortableList draggable=".section-wrapper" group="section">
          {boardSections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </SortableList>
        <div className="add-section-wrapper">
          <AddNewSection
            board_id={board.id}
            controlText={
              boardSections.length > 0 ? "Add another list" : "Add a list"
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sections: state.sections,
  };
};

const mapDispatchToProps = {
  updateBoard,
  reorderSection,
  reorderTask,
  invalidateSectionsState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);

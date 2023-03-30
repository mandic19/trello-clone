import React from "react";
import { connect } from "react-redux";
import { updateBoard } from "../../libs/redux/actions/boardActions";
import { invalidateSectionsState } from "../../libs/redux/actions/sectionActions";
import { reorderSection } from "../../libs/redux/actions/sectionActions";
import InputInline from "../input-inline/InputInline";
import SortableList from "../sortable/SortableList";
import Section from "../section/Section";
import AddNewSection from "./components/add-new-section/AddNewSection";
import useBoard from "./hooks/useBoard";
import "./Board.css";

const Board = (props) => {
  const {
    board,
    sections,
    form,
    onChange,
    onSubmit,
    onBlur,
    onSectionDragEnd,
  } = useBoard(props);

  const sectionCnt = sections.length;

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
        <SortableList
          className="section-container"
          options={{
            draggable: ".section-wrapper",
            group: "section",
            onEnd: onSectionDragEnd,
          }}
        >
          {sections.map((section) => (
            <Section key={section.id} section={section} />
          ))}
        </SortableList>
        <div className="add-section-wrapper">
          <AddNewSection
            board_id={board.id}
            order={sectionCnt}
            controlText={sectionCnt > 0 ? "Add another list" : "Add a list"}
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
  invalidateSectionsState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);

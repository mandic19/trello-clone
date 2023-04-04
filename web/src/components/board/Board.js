import React from "react";
import { connect } from "react-redux";
import {
  updateBoard,
  deleteBoard,
} from "../../libs/redux/actions/boardActions";
import { invalidateSectionsState } from "../../libs/redux/actions/sectionActions";
import { invalidateTasksState } from "../../libs/redux/actions/taskActions";
import { reorderSection } from "../../libs/redux/actions/sectionActions";
import InputInline from "../input-inline/InputInline";
import SortableList from "../sortable/SortableList";
import Section from "../section/Section";
import AddNewSection from "../section/components/add-new-section/AddNewSection";
import useBoard from "./hooks/useBoard";
import "./Board.css";
import ContextMenu from "../context-menu/ContextMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Board = (props) => {
  const {
    board,
    sections,
    form,
    onChange,
    onSubmit,
    onBlur,
    onSectionDragEnd,
    isCtxMenuOpened,
    setIsCtxMenuOpened,
    ctxMenuOptions,
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
        <div className="burger-menu">
          <button
            className="btn btn-secondary btn-icon-only"
            onClick={() => setIsCtxMenuOpened(true)}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {isCtxMenuOpened && (
            <ContextMenu
              title="Board actions"
              options={ctxMenuOptions}
              onClose={() => setIsCtxMenuOpened(false)}
              style={{ right: 0 }}
            />
          )}
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
  deleteBoard,
  reorderSection,
  invalidateSectionsState,
  invalidateTasksState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);

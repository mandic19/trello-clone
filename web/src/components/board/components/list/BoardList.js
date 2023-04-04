import React from "react";
import AddNewBoard from "../add-new-board/AddNewBoard";
import BoardCard from "../card/BoardCard";
import "./BoardList.css";

const BoardList = ({ boards }) => {
  return (
    <div className="board-list">
      <h2>Boards</h2>
      <div className="content">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
        <AddNewBoard />
      </div>
    </div>
  );
};

export default BoardList;

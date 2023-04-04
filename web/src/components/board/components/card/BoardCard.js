import React from "react";
import { useNavigate } from "react-router-dom";
import "./BoardCard.css";

const BoardCard = ({ board }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (board.isDummyModel) return;

    navigate(`/board/${board.id}`);
  };

  return (
    <div className="board-card" onClick={onClickHandler}>
      {board.name}
    </div>
  );
};

export default BoardCard;

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadBoards,
  invalidateBoardsState,
} from "../../libs/redux/actions/boardActions";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import BoardList from "../../components/board/components/list/BoardList";

const HomePage = ({ boards, loadBoards, invalidateBoardsState }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBoards().finally(() => setIsLoading(false));

    return () => {
      invalidateBoardsState();
    };
  }, []);

  return (
    <>
      <Header />
      {isLoading ? <Loader size="2x" /> : <BoardList boards={boards} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
  };
};

const mapDispatchToProps = {
  loadBoards,
  invalidateBoardsState,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

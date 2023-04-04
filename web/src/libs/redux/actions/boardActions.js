import * as types from "./actionTypes";
import * as boardApi from "../../api/boardApi";
import { loadSectionsSuccess } from "./sectionActions";
import { generateUUID } from "../../helpers/uuidHelper";

export function loadBoardsSuccess(boards) {
  return { type: types.LOAD_BOARDS_SUCCESS, boards };
}

export function loadBoardSuccess(board) {
  return { type: types.LOAD_BOARD_SUCCESS, board };
}

export function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, board };
}

export function updateBoardSuccess(board) {
  return { type: types.UPDATE_BOARD_SUCCESS, board };
}

export function deleteBoardSuccess(board) {
  return { type: types.DELETE_BOARD_SUCCESS, board };
}

export function invalidateBoardsState() {
  return { type: types.INVALIDATE_BOARDS_STATE };
}

export function loadBoards(params) {
  return function (dispatch) {
    return boardApi
      .getBoards(params)
      .then((boards) => {
        dispatch(loadBoardsSuccess(boards));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadBoard(id, params) {
  return function (dispatch) {
    return boardApi
      .getBoard(id, params)
      .then((res) => {
        const { sections, ...board } = res;
        dispatch(loadSectionsSuccess(sections));
        dispatch(loadBoardSuccess(board));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createBoard(params) {
  return function (dispatch) {
    const dummyBoard = {
      id: generateUUID(),
      isDummyModel: true,
      ...params,
    };

    dispatch(createBoardSuccess(dummyBoard));

    return boardApi
      .createBoard(params)
      .then((board) => {
        dispatch(deleteBoardSuccess(dummyBoard));
        dispatch(createBoardSuccess(board));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateBoard(board, params) {
  return function (dispatch) {
    return boardApi
      .updateBoard(board.id, params)
      .then((board) => {
        dispatch(updateBoardSuccess(board));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteBoard(board, params) {
  return function (dispatch) {
    return boardApi
      .deleteBoard(board.id, params)
      .then(() => {
        dispatch(deleteBoardSuccess(board));
      })
      .catch((error) => {
        throw error;
      });
  };
}

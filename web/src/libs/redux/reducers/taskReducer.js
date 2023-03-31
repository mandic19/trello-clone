import initialState from "./initialState";
import * as types from "../actions/actionTypes";
import * as reorderHelper from "../../helpers/reorderHelper";

export default function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case types.LOAD_TASKS_SUCCESS:
      return [...state, ...action.tasks];
    case types.CREATE_TASK_SUCCESS:
      return [...state, action.task];
    case types.UPDATE_TASK_SUCCESS:
      return state.map((task) =>
        task.id !== action.task.id ? task : action.task
      );
    case types.REORDER_TASK_SUCCESS:
      let result = [];
      const task = state.find((x) => x.id === action.task.id);

      if (task.section_id !== action.task.section_id) {
        result = state.map((t) => {
          if (t.id === action.task.id) {
            return action.task;
          } else if (
            t.order >= action.task.order &&
            t.section_id === action.task.section_id
          ) {
            return { ...t, order: t.order + 1 };
          } else {
            return t;
          }
        });
      } else {
        const { increment, bottomLimit, topLimit } = reorderHelper.getParams(
          task.order,
          action.task.order
        );

        result = state.map((t) => {
          if (t.id === action.task.id) {
            return action.task;
          } else if (
            t.section_id === action.task.section_id &&
            t.order >= bottomLimit &&
            t.order <= topLimit
          ) {
            return { ...t, order: t.order + increment };
          } else {
            return t;
          }
        });
      }

      return result.sort((a, b) => a.order - b.order);
    case types.DELETE_TASK_SUCCESS:
      return state.filter((task) => task.id !== action.task.id);
    case types.DELETE_SECTION_TASKS_SUCCESS:
      return state.filter((task) => task.section_id !== action.section.id);
    case types.ADD_SECTION_TASKS_SUCCESS:
      return [...task, action.tasks];
    default:
      return state;
  }
}

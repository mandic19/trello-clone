import * as types from "./actionTypes";
import * as taskApi from "../../api/taskApi";
import { generateUUID } from "../../helpers/uuidHelper";

export function loadTasksSuccess(tasks) {
  return { type: types.LOAD_TASKS_SUCCESS, tasks };
}

export function createTaskSuccess(task) {
  return { type: types.CREATE_TASK_SUCCESS, task };
}

export function updateTaskSuccess(task) {
  return { type: types.UPDATE_TASK_SUCCESS, task };
}

export function reorderTaskSuccess(task) {
  return { type: types.REORDER_TASK_SUCCESS, task };
}

export function deleteTaskSuccess(task) {
  return { type: types.DELETE_TASK_SUCCESS, task };
}

export function invalidateTasksState() {
  return { type: types.INVALIDATE_TASKS_STATE };
}

export function loadTasks(params) {
  return function (dispatch) {
    return taskApi
      .getTasks(params)
      .then((tasks) => {
        dispatch(loadTasksSuccess(tasks));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function createTask(params) {
  return function (dispatch) {
    const dummyTask = {
      id: generateUUID(),
      isDummyModel: true,
      ...params,
    };

    dispatch(createTaskSuccess(dummyTask));

    return taskApi
      .createTask(params)
      .then((task) => {
        dispatch(deleteTaskSuccess(dummyTask));
        dispatch(createTaskSuccess(task));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateTask(task, params) {
  return function (dispatch) {
    return taskApi
      .upadteTask(task.id, params)
      .then((task) => {
        dispatch(updateTaskSuccess(task));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function reorderTask(id, params) {
  return function (dispatch, getState) {
    const task = getState().tasks.find((x) => x.id === id);

    dispatch(reorderTaskSuccess({ ...task, ...params }));

    return taskApi.reorderTask(id, params).catch((error) => {
      dispatch(reorderTaskSuccess(task));
      throw error;
    });
  };
}

export function deleteTask(task, params) {
  return function (dispatch) {
    return taskApi
      .deleteTask(task.id, params)
      .then(() => {
        dispatch(deleteTaskSuccess(task));
      })
      .catch((error) => {
        throw error;
      });
  };
}

import axios from 'axios';

export const GET_ALL_TASKS = 'GET_ALL_TASKS';
export const GET_TASK = 'GET_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const GET_ALL_OWNERS = 'GET_ALL_OWNERS';
export const ASSIGN_TASK = 'ASSIGN_TASK';
export const UNASSIGN_TASK = 'UNASSIGN_TASK';
export const TASK_UPDATED = 'TASK_UPDATED';
export const ERROR = 'ERROR';

// Actions
export const gotAllTasks = (tasks) => ({ type: GET_ALL_TASKS, tasks });
export const gotTask = (task) => ({ type: GET_TASK, task });
export const updatedTask = (task) => ({ type: UPDATE_TASK, task });
export const addedTask = (task) => ({ type: ADD_TASK, task });
export const deletedTask = (taskId) => ({ type: DELETE_TASK, taskId });
export const assignTask = (task) => ({ type: ASSIGN_TASK, task });
export const unassignTask = (task) => ({ type: UNASSIGN_TASK, task });
export const gotAllOwners = (owners) => ({ type: GET_ALL_OWNERS, owners });
export const taskUpdated = (updatedTask) => ({type: TASK_UPDATED, payload: updatedTask,});
export const error = (message) => ({ type: ERROR, message });

// Thunk creation
export const fetchAllTasks = () => {
  const url = '/api/tasks';

  return async (dispatch) => {
    try {
      const response = await axios.get(url);
      const tasks = response.data;
      dispatch(gotAllTasks(tasks));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

export const fetchTask = (taskId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tasks/${taskId}`);
    const task = res.data;
    if (task.ownerId !== null) {
      const ownerResponse = await axios.get(`/api/users/${task.ownerId}`);
      const owner = ownerResponse.data;
      const updatedTask = { ...task, owner };
      dispatch(gotTask(updatedTask));
    } else {
      const updatedTask = { ...task, owner: null };
      dispatch(gotTask(updatedTask));
    }
  } catch (error) {
    console.error('Error fetching task:', error.message);
    dispatch(error(error.message));
  }
};



export const addTask = (newTask) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/api/tasks', newTask);
      const task = response.data;
      dispatch(addedTask(task));
      dispatch(fetchAllTasks());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      dispatch(deletedTask(taskId));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

export const assignTaskThunk = (taskId, ownerId) => async (dispatch) => {
  try {
    await axios.put(`/api/tasks/${taskId}/${ownerId}`);
    dispatch(assignTask(taskId, ownerId));
  } catch (error) {
    console.error(error);
    dispatch(fetchTasksError(error));
  }
};

export const unassignTaskThunk = (taskId) => async (dispatch) => {
  try {
    await axios.put(`/api/tasks/unassign/${taskId}`);
    dispatch(unassignTask(taskId));
    dispatch(fetchTask(taskId)); 
  } catch (error) {
    console.error(error);
    dispatch(error(error.message));
  }
};


export const updateTask = (id, updatedTask) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updatedTask);
      const updatedTaskDetails = response.data;
      dispatch(taskUpdated(updatedTaskDetails));
      dispatch(fetchAllTasks());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};



export const fetchAllTasksWithOwners = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/tasks');
    const tasks = response.data;

    const tasksWithOwners = await Promise.all(tasks.map(async (task) => {
      if (task.ownerId) {
        const ownerResponse = await axios.get(`/api/users/${task.ownerId}`);
        const owner = ownerResponse.data;
        task.owner = {
          id: owner.id,
          firstName: owner.firstName,
        };
      } else {
        task.owner = null;
      }
      return task;
    }));

    const owners = tasksWithOwners.map(task => task.owner ? task.owner.firstName : 'No owner');

    dispatch(gotAllOwners(owners));
  } catch (error) {
    console.error('Error fetching tasks with owners:', error.message);
    dispatch(error(error.message));
  }
};
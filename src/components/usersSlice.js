import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const ActionTypes = {
  GET_ALL_USERS: 'GET_ALL_USERS',
  GET_USER: 'GET_USER',
  UPDATE_USER: 'UPDATE_USER',
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
  ERROR: 'ERROR',
};

export const getAllUsers = (users) => ({ type: ActionTypes.GET_ALL_USERS, users });
export const getUser = (user) => ({ type: ActionTypes.GET_USER, user });
export const updatedUser = (user) => ({ type: ActionTypes.UPDATE_USER, user });
export const addUser = (user) => ({ type: ActionTypes.ADD_USER, user });
export const error = (message) => ({ type: ActionTypes.ERROR, message });

export const fetchUser = createAsyncThunk('users/fetchUser', async (userId) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const user = response.data;

    const tasksResponse = await axios.get('/api/tasks');
    const tasks = tasksResponse.data;

    const tasksWithOwners = tasks.filter((task) => task.ownerId === user.id);

    user.tasks = tasksWithOwners;

    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    throw error;
  }
});


export const fetchAllUsers = createAsyncThunk(ActionTypes.GET_ALL_USERS, async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const createUser = createAsyncThunk(ActionTypes.ADD_USER, async (userData) => {
  try {
    const response = await axios.post('/api/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.message);
    throw error;
  }
});

export const deleteUser = createAsyncThunk(ActionTypes.DELETE_USER, async (userId) => {
  try {
    await axios.delete(`/api/users/${userId}`);
    return userId;
  } catch (error) {
    console.error('Error deleting user:', error.message);
    throw error;
  }
});

export const unassignTask = createAsyncThunk(ActionTypes.UNASSIGN_TASK, async (taskId) => {
  const response = await axios.put(`/api/tasks/${taskId}/unassign`);
  return response.data;
});

export const updateUser = createAsyncThunk(ActionTypes.UPDATE_USER, async (userData) => {
  try {
    const response = await axios.put(`/api/users/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.message);
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { all: [], current: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.all = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.all.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.all = state.all.filter((user) => user.id !== action.payload);
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.error('Error fetching all users:', action.error.message);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        console.error('Error fetching user:', action.error.message);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error('Error creating user:', action.error.message);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.error('Error deleting user:', action.error.message);
      })
      .addCase(unassignTask.fulfilled, (state, action) => {
        const updatedUserId = action.payload.userId;
        const updatedTaskId = action.payload.taskId;
        const user = state.all.find((user) => user.id === updatedUserId);
        if (user) {
          user.assignedTasks = user.assignedTasks.filter((task) => task.id !== updatedTaskId);
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        state.current = updatedUser;
        const updatedUserIndex = state.all.findIndex((user) => user.id === updatedUser.id);
        if (updatedUserIndex !== -1) {
          state.all[updatedUserIndex] = updatedUser;
        }
      });
  },
});

export default usersSlice.reducer;
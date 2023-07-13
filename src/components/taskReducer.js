import { GET_ALL_TASKS, GET_TASK, UPDATE_TASK, ADD_TASK, DELETE_TASK, ASSIGN_TASK, UNASSIGN_TASK, GET_ALL_OWNERS } from './taskActions';

const initialState = {
  all: [],
  selected: {},
  owners: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return { ...state, all: action.tasks };
    case GET_TASK:
      return { ...state, selected: action.task };
    case UPDATE_TASK:
      return { ...state, selected: action.task };
    case ADD_TASK:
      return { ...state, all: [...state.all, action.task] };
    case DELETE_TASK:
      const updatedTasks = state.all.filter((task) => task.id !== action.taskId);
      return { ...state, all: updatedTasks };
    case ASSIGN_TASK:
      const updatedAllTasksWithAssign = state.all.map((task) => {
        if (task.id === action.taskId) {
          return { ...task, ownerId: action.userId };
        }
        return task;
      });
      return {
        ...state,
        selected: state.selected.id === action.taskId ? { ...state.selected, ownerId: action.userId } : state.selected,
        all: updatedAllTasksWithAssign,
      };
    case UNASSIGN_TASK:
      const updatedAllTasksWithUnassign = state.all.map((task) => {
        if (task.id === action.taskId) {
          return { ...task, ownerId: null }; // Set ownerId to null for the unassigned task
        }
        return task;
      });
      return {
        ...state,
        selected: state.selected.id === action.taskId ? { ...state.selected, ownerId: null } : state.selected,
        all: updatedAllTasksWithUnassign,
      };
    case GET_ALL_OWNERS:
      return {
        ...state,
        owners: action.owners,
      };
    default:
      return state;
  }
};

export default taskReducer;

/* Here is where you will configure the store 

*/ 
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../components/taskReducer';
import userReducer from '../components/usersSlice';

const reducer = {
  tasks: taskReducer,
  users: userReducer
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


// const reducer ={
//   tasks: taskReducer,
//   users: userReducer
// }

// export default configureStore({
//   reducer
// });

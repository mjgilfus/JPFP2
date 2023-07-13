import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/index.js';
import TaskList from './TaskList.js';
import NavBar from './NavBar.js';
import UserList from './UserList';
import User from "./user.js";
import TaskDetail from './taskDetails.js';

const HomePage = () => <h1>To do list</h1>;

function Main() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/users/:userId" element={<User />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
          </Routes>
      </Router>
    </Provider>
  );
}

export default Main;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasks, deleteTask } from './taskActions';
import { Link } from 'react-router-dom';
import TaskForm from './forms/TaskForm';
import axios from 'axios';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasksData = useSelector(state => state.tasks.all);
  
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error(error);
    }
  };  
  
  useEffect(() => {
    dispatch(fetchAllTasks())
      .catch(err => console.error('Error fetching tasks:', err.message));
  }, [dispatch]);


  if (!tasksData.length) {
    return <div>Getting tasks now...</div>;
  }

  if (!tasksData || !Array.isArray(tasksData)) {
    return <div>No tasks to display.</div>;
  }  

  return (
    <div>
      <h1>All tasks</h1>
      <TaskForm />
      {tasksData.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>
            <h2>{task.description}</h2>
          </Link>
          <p>Assigned to <Link to={`/users/${task.owner}`}>{task.owner}</Link></p>
          <p>Difficulty: {task.difficulty}</p>
          <p>Category: {task.category}</p>
          <button onClick={() => handleDeleteTask(task.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

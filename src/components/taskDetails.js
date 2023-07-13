import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTask, updateTask, fetchAllTasksWithOwners } from './taskActions';
import { Link } from "react-router-dom";
import { fetchAllUsers } from "./usersSlice";
import { fetchUser } from "./usersSlice";
import axios from 'axios';
import TaskUpdate from "./forms/TaskUpdate";

const TaskDetail = () => {
  const id = Number(useParams().id);
  const task = useSelector(state => state.tasks.selected);
  const users = useSelector(state => state.users.all);
  const taskOwners = useSelector(state => state.tasks.owners);
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [currentTask, setTask] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [description, setDescription] = useState(task ? task.description : "");
  const [category, setCategory] = useState(task ? task.category : "");
  const [difficulty, setDifficulty] = useState(task ? task.difficulty : "");

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        dispatch(fetchTask(id)),
        dispatch(fetchAllUsers()),
        fetchAllTasksWithOwners()(dispatch)
      ]);
    }
    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setCategory(task.category);
      setDifficulty(task.difficulty);
      
      if (task.ownerId && !task.owner) {
        dispatch(fetchUser(task.ownerId)).then((owner) => {
          const updatedTask = { ...task, owner };
          setTask(updatedTask);
        });
      } else {
        setTask(task);
      }
    }
  }, [task, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdateSubmit = (e) => {
    const updatedTask = {
      id: task.id,
      description,
      category,
      difficulty,
    };
    dispatch(updateTask(id, updatedTask));
    setIsEditing(false);
  };  

  const determineComplete = (task) => {
    if (!task.complete) {
      return <p>Incomplete</p>;
    } else {
      return <p>Finished!</p>;
    }
  };

  const handleUnassignTask = (taskId) => {
    dispatch(unassignTaskThunk(taskId));
    setTask((currentTask) => {
      if (currentTask) {
        return { ...currentTask, id: taskId, ownerId: null };
      }
      return currentTask;
    });
  };

  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleSubmit = async () => {
    if (currentTask && selectedUserId) {
      const updatedTaskData = { ownerId: selectedUserId };
      try {
        await dispatch(updateTask(currentTask.id, updatedTaskData, false));

        const updatedTaskResponse = await axios.get(`/api/tasks/${currentTask.id}`);
        const updatedTask = updatedTaskResponse.data;
        if (updatedTask.ownerId) {
          const ownerResponse = await axios.get(`/api/users/${updatedTask.ownerId}`);
          const owner = ownerResponse.data;
          updatedTask.owner = owner;
        } else {
          updatedTask.owner = null;
        }
        setTask(updatedTask);

        dispatch(fetchAllTasksWithOwners());
      } catch (error) {
        dispatch(error(error.message));
      }
    } else {
      alert('Please select a user');
    }
  };

  return (
    <div>
      <>
        {isEditing ? (
          <TaskUpdate task={task} onUpdate={handleUpdateSubmit} />
        ) : (
          <button onClick={handleEdit}>Edit Task</button>
        )}
      </>
      <Link to={`/tasks/${task.id}`}>
        {task.description}
      </Link>
      <p>
        Assigned to: {currentTask.owner ? currentTask.owner.firstName : ""}
        {currentTask.owner ? (
          <>
            <Link to={`/users/${currentTask.owner.id}`}>{currentTask.owner.firstName}</Link>
            <button onClick={() => handleUnassignTask(currentTask.id)}>Unassign</button>
          </>
        ) : (
          <>
            <span>Has no owner</span>
          </>
        )}
      </p>
      <p>Difficulty: {currentTask.difficulty}</p>
      <p>Category: {currentTask.category}</p>
      {determineComplete(currentTask)}
      <select onChange={handleSelectChange}>
        <option value="">Assign To</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.firstName}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default TaskDetail;

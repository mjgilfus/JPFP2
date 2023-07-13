import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../taskActions';

const TaskUpdate = ({ task }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);
  const [difficulty, setDifficulty] = useState(task.difficulty);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      description,
      category,
      difficulty,
    };

    dispatch(updateTask(task.id, updatedTask));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Difficulty:
        <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        </select>
        </label>

      <button type="submit">Update Task</button>
    </form>
  );
};

export default TaskUpdate;

import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTask } from "../taskActions";

const TaskForm = () => {
    const dispatch = useDispatch();
  
    
    const [taskData, setTaskData] = useState({description: '', category: '', difficulty: 0});

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (taskData.description.trim() === '' || taskData.category.trim() === '' || taskData.difficulty === 0) {
            alert('Please fill all the fields');
            return;
        };
    
        if (taskData.difficulty < 1 || taskData.difficulty > 5) {
            alert('Difficulty must be between 1 and 5');
            return;
        }; 
        const newTask = {
            description: taskData.description,
            difficulty: taskData.difficulty,
            category: taskData.category,
        };
    
        dispatch(addTask(newTask));
    
        setTaskData({description: '', category: '', difficulty: 0});
    };    

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={taskData.description} onChange={e => setTaskData({...taskData, description: e.target.value})} placeholder="Description" required/>
            <input type="text" value={taskData.category} onChange={e => setTaskData({...taskData, category: e.target.value})} placeholder="Category" required/>
            <input type="number" value={taskData.difficulty} onChange={e => setTaskData({...taskData, difficulty: parseInt(e.target.value)})} placeholder="Difficulty" min="1" max="5" required/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TaskForm;

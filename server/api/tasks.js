const express = require('express');
const router = express.Router();
const Task = require('../db/models/Task.js');
const User = require('../db/models/User.js');

// Get all tasks with their owners
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error("Error in /api/tasks GET route:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific task by ID
router.get('/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Create a new task
router.post('/', async(req, res, next) =>{
  try{
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch(err){
    console.error(err);
    next(err)
  }
})

// Delete a task
router.delete('/:taskId', async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.taskId);
    if (task) {
      await task.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Assign a user to a task
router.put('/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { ownerId } = req.body;
    const task = await Task.findByPk(taskId);
    if (task) {
      task.ownerId = ownerId;
      await task.save();
      res.status(200).send('Task updated successfully');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/unassign/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);
    if (task) {
      task.ownerId = null; 
      await task.save(); 
      res.status(200).send('Task updated successfully');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { description, category, difficulty } = req.body;
    const task = await Task.findByPk(taskId);

    if (task) {
      // Update the task's information
      task.description = description;
      task.category = category;
      task.difficulty = difficulty;

      // Save the updated task
      await task.save();

      res.json(task);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../db/models/User.js');
const Task = require('../db/models/Task.js')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }});

  router.post('/', async(req, res, next) =>{
    try{
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    }catch(err){
      console.error(err);
      next(err)
    }
  })

  router.delete('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      await User.deleteUserById(userId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

  router.put('/:taskId/unassign',async (req, res, next) => {
    try {
      const { taskId } = req.params;
      await Task.unassignTaskById(taskId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });

router.put('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, email } = req.body;
    const user = await User.findByPk(userId);

    if (user) {
      // Update the user's information
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;

      // Save the updated user
      await user.save();

      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

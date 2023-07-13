const express = require('express');
const path = require('path');
const cors = require('cors');
const volleyball = require('volleyball');
const app = express();
const tasksRouter = require('./api/tasks.js');
const usersRouter = require('./api/users.js');
app.use(express.json());

app.use(cors());
app.use(volleyball);


// Mount the tasks router
app.use('/api/tasks', tasksRouter);

// Mount the users router
app.use('/api/users', usersRouter);

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Catch-all route
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;


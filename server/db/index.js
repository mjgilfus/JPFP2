const db = require('../database');
const User = require('./User');
const Task = require('./Task');

User.hasMany(Task, {
  foreignKey: 'ownerId',
  as: 'tasks',
});
  
Task.belongsTo(User, {
  foreignKey: 'ownerId',
  as: 'user',
});

module.exports = {
  db,
  User,
  Task
}

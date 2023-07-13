const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Facebook_default_male_avatar.gif?20160510190849'
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    bio: {
      type: Sequelize.TEXT,
    }
  });
  User.deleteUserById = async (id) => {
    await User.destroy({ where: { id } });
  };
  User.unassignTaskById = async (taskId) => {
    const task = await Task.findByPk(taskId);
    if (task) {
      await task.update({ userId: null });
    }
  };



module.exports = User;

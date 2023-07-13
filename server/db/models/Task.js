const Sequelize = require('sequelize');
const db = require('../database');

const Task = db.define('task', {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull:false
    },
    ownerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' }
    }
});

Task.deleteTaskById = async (id) => {
    await Task.destroy({ where: { id } });
  };


module.exports = Task;

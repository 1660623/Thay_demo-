const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./user');

const Todo = db.define('vieclam', {
  // attributes
  task: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  done: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

Todo.belongsTo(User);

module.exports = Todo;

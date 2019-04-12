const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('User', {
  // attributes
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;

const Sequelize = require('sequelize');

const url = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:9999/Status'
const db = new Sequelize(url);

module.exports = db;
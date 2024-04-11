const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('trajesmex_db', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: '172.15.238.10'
  });

module.exports = sequelize;
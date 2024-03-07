const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Estado = sequelize.define('estado', {
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },

    //productId
});

module.exports = Estado;
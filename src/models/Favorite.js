const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Favorite = sequelize.define('favorite', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    //userId
    //productId
});

module.exports = Favorite;
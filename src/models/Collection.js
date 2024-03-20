const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Collection = sequelize.define('collection', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //userId
    //productId
});

module.exports = Collection;
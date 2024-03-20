const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    origen: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl3: {
        type: DataTypes.STRING,
        allowNull: true
    }
    //estadoId - from Estado model
});

module.exports = Product;
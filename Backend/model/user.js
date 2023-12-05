const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// sequelize.sync().then(() => {
//     console.log('User table created successfully!');
// }).catch((error) => {
//     console.error('Unable to create table: ', error);
// });
module.exports = User;

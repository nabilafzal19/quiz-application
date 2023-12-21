const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db')
const User = require('./user')

const Question = sequelize.define('question', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    questionNumber: {
        type: DataTypes.INTEGER
    },
    question: {
        type: DataTypes.STRING
    },
    option1: {
        type: DataTypes.STRING
    },
    option2: {
        type: DataTypes.STRING
    },
    option3: {
        type: DataTypes.STRING
    },
    option4: {
        type: DataTypes.STRING
    },
    correctAnswer: {
        type: DataTypes.STRING
    },
    attemptedAnswer: {
        type: DataTypes.STRING
    }
});
// Question.belongsTo(User)
// Question.sync().then(() => {
//     console.log('questions table is created')
// }).catch((error) => {
//     console.log('error while creating question table', error)
// })
module.exports = Question
const Sequelize = require('sequelize')

exports.sequelize = new Sequelize('mcq_db', 'postgres', 'antinoAisehi', {
    host: 'localhost',
    dialect: 'postgres'
});

exports.connection = async () => {

    try {
        this.sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}




const { Sequelize } = require('sequelize');
const keys = require('../../config/keys')
// console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// console.log('keys', keys)

const database = new Sequelize(keys.postgresDBurl)

try {
    database.authenticate();
    //updates, but deletes database.
    (async () => await Sequelize.sync({ force: true}));
    console.log('CONNECTED');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = database;

const Sequelize = require('sequelize');
const keys = require('../../config/keys')

const sequilize = new Sequelize(keys.postgresDBurl)

try {
    // sequilize.authenticate();
    console.log('CONNECTED');
} catch (e) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequilize;
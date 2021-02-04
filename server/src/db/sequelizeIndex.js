const Sequelize = require('sequelize');
const keys = require('../../config/keys')

console.log("environment", process.env.NODE_ENV)
console.log("KEYS", keys)
const sequilize = new Sequelize(keys.postgresDBurl)

try {
    // sequilize.authenticate();
    console.log('CONNECTED');
} catch (e) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequilize;
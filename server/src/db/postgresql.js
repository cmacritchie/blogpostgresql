const { Sequelize } = require('sequelize');
const database = new Sequelize(process.env.POSTGRESDB)

try {
    database.authenticate();
    //updates, but deletes database.
    // (async () => await Sequelize.sync({ force: true}));
    console.log('connected to Postgres');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = database;
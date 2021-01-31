const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const database = require('../db/postgresql');
const { DataTypes } = Sequelize

const userSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    token: {
        type: DataTypes.STRING
    }
}

const userOptions = {
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
        }
    },
}

const User = database.define('Users', userSchema, userOptions)
// User.sync({force: true})

User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

User.prototype.toJSON = function() {
    const user = this.dataValues
    delete user.password
    delete user.token
    return user
}

module.exports = User
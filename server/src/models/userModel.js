const Sequelize = require('sequelize');
const sequelize = require('../db/sequelizeIndex')
const db = require('../db/index') //need this or it doesn't work check console.log
const bcrypt = require('bcrypt');
// const database = require('../db/postgresql');
const BlogPost = require('./blogModel')
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
    }
}

const userOptions = {
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, 8);
        }
    },
}

const User = sequelize.define('Users', userSchema, userOptions)
// User.hasMany(BlogPost, { foreignKey: 'UserId' });
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
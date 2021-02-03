const Sequelize = require('sequelize');
// const database = require('../db/postgresql');
const sequelize = require('../db/sequelizeIndex')
const db = require('../db/index') //need this or it doesn't work check console.log
const User = require('./userModel')
const { DataTypes } = Sequelize

const blogSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.BLOB
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}

const BlogPost = sequelize.define('BlogPost', blogSchema)
// BlogPost.belongsTo(User)
// BlogPost.sync({force: true})

BlogPost.prototype.toJSON = function() {
    const blogpost = this.dataValues
    // delete blogpost.imageUrl
    return blogpost
}

module.exports = BlogPost
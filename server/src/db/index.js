const sequelize = require('./sequelizeIndex')
const User = require('../models/userModel')
const BlogPost = require('../models/blogModel')

// const entities = {
//     users: User,
//     blogPost: BlogPost
// }

// entities.users.hasMany(entities.blogPost, { foreignKey: 'UserId' })
// entities.blogPost.belongsTo(entities.users)
BlogPost.belongsTo(User)
// console.log(User)
User.hasMany(BlogPost, { foreignKey: 'UserId' })

//synchronize
sequelize.sync({force: false}).then(function () {
    console.log("Database Configured");
})

// sequelize.authenticate();

// try {
//     database.authenticate();
//     //updates, but deletes database.
//     // (async () => await Sequelize.sync({ force: true}));
//     console.log('CONNECTED');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

module.exports = { User, BlogPost };
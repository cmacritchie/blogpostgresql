require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const morgan = require('morgan');
const cookieCheck = require('./middleware/cookieCheck');
const keys = require('../config/keys')

//Databases
// require('./db/postgresql')
require('./db/index')

//assoications
const entities = {
    users: require('./models/userModel.js'),
    blogPost: require('./models/blogModel')
}

entities.users.hasMany(entities.blogPost, { foreignKey: 'UserId' })
entities.blogPost.belongsTo(entities.users)

//routers
const userRouter = require('./routers/userRouter')
const blogRouter = require('./routers/blogRouter')

// //
const app = express()
//const port = process.env.PORT || 5000

//using
app.set('trust proxy', 1) //TODO check why we do this
// app.use(express.json()) //TODO check why we do this
// app.use(morgan('dev')) 
app.use(bodyParser.json()) //TODO check why we do this
app.use(bodyParser.urlencoded({ extended: true }));  //parse parameters to req.body
app.use(cookieParser()); //access cookies in browser


//middleware



//express-session
app.use(session({
    key: 'user_sid',
    secret: keys.sessionSecret,
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

//production?
// var sess = {
//     secret: 'keyboard cat',
//     cookie: {}
//   }
  
//   if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
//   }
  
// app.use(session(sess))

app.use(cookieCheck)
app.use(userRouter)
app.use(blogRouter)

console.log("environemnt", process.env.NODE_ENV)
if (['production', 'ci', 'preproduction'].includes(process.env.NODE_ENV)) {
    app.use(express.static(__dirname + '/../../client/build'));
  
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}
// app.listen(port, () => {
//     console.log(`server is up on port ${port}`)
// })

module.exports = app
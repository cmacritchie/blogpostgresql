const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        // console.log('You are good to go');
        next()
    } else {
        // console.log('you are not good to go')
        res.status(401).send("Unauthorized")
        // next();
    }    
};

module.exports = sessionChecker;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy; //how auth is carried out
const passwordUtils = require("./passwordUtils");
const User = require('../models/user');


passport.use(new localStrategy({
    usernameField : 'email'
}, function(email,password,done){
    User.findOne({email : email}, function(err,user){
        if(err){
            console.log("Error Finding the User");
            return done(err);
        }
        var passVerify = false;
        if(user != null)
            passVerify = passwordUtils.validatePassword(password, user.hash, user.salt);
        if(!user || !passVerify){
            console.log("Invalid User")
            return done(null,false);
        }
        return done(null,user)
    })
}
));

passport.serializeUser(function(user,done) {
    done(null,user.id);
})

passport.deserializeUser(function(id ,done){
    User.findById(id, function(err,user){
        if(err){
            console.log("Error Finding the User");
            return done(err);
        }
        done(null,user);
    })
});

passport.checkAuthentication = function(req,res,next) {
    
    if(req.isAuthenticated())
        return next();
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.URI = process.env.SOCKET_URI;
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;
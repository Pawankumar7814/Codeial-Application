const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport 
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password, done) {
        try {
            // Find a user and establish the identity
            var user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                console.log('Invalid username or password');
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }
));

// Serialize the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// Deserialize the user to decide which key is to be kept in the cookie
passport.deserializeUser(async function(id, done) {
    try {
        var user = await User.findById(id);
        // console.log("DE1 ", id);
        // console.log("Deserialize : ", user);
        return done(null, user);
    } catch (err) {
        console.log(err);
    }
});

// Check if the user is signed in or not (Basically It is a middleware if user is signed then w)
passport.checkAuthentication = function(req, res, next) {
    // If the user is signed in, then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    // If the user is not signed in
    return res.redirect('/users/sign-in');
}

// Check if user is signed in then it will show the user data to  the views else not
passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this
        // to locals for the views
        res.locals.user = req.user;
        // console.log("Hello =", req.user);
    }
    next();
}

module.exports = passport;
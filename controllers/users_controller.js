const mongoose = require('../config/mongoose');
const User = require('../models/user');


// To view the user profile
module.exports.profile = async function(req, res) {
    // return res.end('user profile page');
    var user = await User.findById(req.params.id);
    // console.log(user);
    return res.status(200).render('profile', { title: "Profile - Codeial", profile_user: user });
}

// To update the user profile
module.exports.update = async function(req, res) {
    try {
        if (req.user.id == req.params.id) {
            var user = await User.findByIdAndUpdate(req.params.id, req.body);
            if (!user) {
                return res.status(404).send('User not found');
            }
            return res.redirect('back');
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
}

// Route to sign up
module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.status(200).render('signup', { title: "Sign up - Codeial" });
}

// Route to sign in page
module.exports.signin = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.status(200).render('signin', { title: "Sign in - Codeial" });
}

// Route to create a new user
module.exports.createUser = async function(req, res) {
    var userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }
        // console.log(userData);
    try {
        var checkUser = await User.findOne({ email: userData.email });
        if (!checkUser) {
            if (userData.password != userData.confirm_password) {
                return res.redirect('/users/sign-up');
            }
            var user = await User.create({
                name: userData.name,
                email: userData.email,
                password: userData.password
            });
            console.log(user);
            return res.redirect('/users/sign-in');
        }
        return res.redirect('back');
    } catch (error) {
        console.log(`Error while creating the user ${error}`);
    }
}

// Route to home page after user log in
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully.');
    return res.redirect('/');
}

// Route to sign out
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.send(err); // Error showing in the terminal while sign out
        }
    });
    // Passport gives this req.
    req.flash('success', 'Logged out successfully.');
    return res.redirect('/');
}
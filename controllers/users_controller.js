const mongoose = require('../config/mongoose');
const User = require('../models/user');

module.exports.profile = function(req, res) {
    // return res.end('user profile page');
    return res.status(200).render('profile', {
        title: "Profile - Codeial"
    })
}

module.exports.signup = function(req, res) {
    return res.status(200).render('signup', { title: "Sign up - Codeial" });
}

module.exports.signin = function(req, res) {
    return res.status(200).render('signin', { title: "Sign in - Codeial" });
}

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
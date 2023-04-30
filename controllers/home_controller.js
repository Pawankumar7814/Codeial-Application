// Import modules and models
// const mongoose = require('../config/mongoose');
const Post = require('../models/post');

// Route to home page and parallely we are displaying the post and user data 
module.exports.home = async function(req, res) {
    try {
        var post = await Post.find({}).populate('user').exec();
        return res.status(200).render('home', {
            title: "Home - Codeial",
            posts: post
        });
    } catch (error) {
        console.log(error);
    }
}
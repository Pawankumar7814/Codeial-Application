// Import modules and models
// const mongoose = require('../config/mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
// Route to home page and parallely we are displaying the post and user data 
module.exports.home = async function(req, res) {
    // try {
    //     var post = await Post.find({}).populate('user').exec();
    //     var comment = await Comment.find({}).populate('post').exec();
    //     return res.status(200).render('home', {
    //         title: "Home - Codeial",
    //         posts: post,
    //         comments: comment
    //     });
    // } catch (error) {
    //     console.log(error);
    // }

    // Nested population
    try {
        var post = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                }
            })
            .exec();
        // var comment = await Comment.find({}).populate('post').exec();

        var user = await User.find();
        return res.status(200).render('home', {
            title: "Home - Codeial",
            posts: post,
            comments: post,
            users: user
        });
    } catch (error) {
        console.log(error);
    }
}
//Import modules and models
const Post = require('../models/post');
const mongoose = require('../config/mongoose');

module.exports.postCreate = async function(req, res) {
    var postData = {
        content: req.body.content
    }
    console.log('post');
    try {
        var post = await Post.create({
            content: postData.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
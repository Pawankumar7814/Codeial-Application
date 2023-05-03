//Import modules and models
const Post = require('../models/post');
const mongoose = require('../config/mongoose');
const Comment = require('../models/comment');

module.exports.postCreate = async function(req, res) {
    try {
        var postData = {
            content: req.body.content
        }
        var post = await Post.create({
            content: postData.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

// To remove the post
module.exports.destroy = async function(req, res) {
    try {
        var post = await Post.findById(req.params.id).lean();
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });
        }
        return res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}
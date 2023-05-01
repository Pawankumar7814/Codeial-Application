// Import modules and models
const Comment = require('../models/comment');
const Post = require('../models/post');
// const Post = require('../models/post');


module.exports.addComment = async function(req, res) {
    try {
        var post = await Post.findById(req.body.post);
        if (post) {
            var commentData = {
                content: req.body.content,
                post: req.body.post
            }
            var comment = await Comment.create({
                content: commentData.content,
                post: commentData.post,
                user: req.user._id
            });
            if (post && post.comment) {
                post.comment.push(comment);
                await post.save();
            }
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}
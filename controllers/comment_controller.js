// Import modules and models
const Comment = require('../models/comment');
const Post = require('../models/post');

// Route to add a new comment
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

// To delete the comments from the database either from the collection of post or comments (Basically from both)
module.exports.destroy = async function(req, res) {
    try {
        var comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            await Comment.deleteOne({ _id: req.params.id });
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
    }
}
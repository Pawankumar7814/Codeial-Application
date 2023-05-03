// Import modules and models
const express = require('express');
const router = express.Router();
const passport = require('passport');
const commentController = require('../controllers/comment_controller');

// Route to add a new comment
router.post('/new-comment', passport.checkAuthentication, commentController.addComment);
// Route to delete an existing comment
router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);
module.exports = router;
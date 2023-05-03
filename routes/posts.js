//Import modules and models
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const passport = require('passport');

// Route to add new post
router.post('/add-new-post', passport.checkAuthentication, postController.postCreate);
// Route to remove the post
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);
module.exports = router;
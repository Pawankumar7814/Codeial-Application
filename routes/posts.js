//Import modules and models
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const passport = require('passport');

// Route to add new post
router.post('/add-new-post', passport.checkAuthentication, postController.postCreate);

module.exports = router;
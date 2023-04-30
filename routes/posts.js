//Import modules and models
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');
const passport = require('passport');

// Route to user post page
router.post('/add-new-post', passport.checkAuthentication, postController.postCreate);

module.exports = router;
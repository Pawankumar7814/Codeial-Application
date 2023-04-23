const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');
// Route to user profile page
router.get('/profile', userController.profile);

// Route to user post page
router.get('/post', postController.post);

module.exports = router;
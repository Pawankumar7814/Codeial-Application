const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');
// Route to user profile page
router.get('/profile', userController.profile);

// Route to sign up page
router.get('/sign-up', userController.signup);
// Route to sign in page
router.get('/sign-in', userController.signin);

// Route to create user
router.post('/create-user', userController.createUser);
router.post('/create-session', userController.createSession);
// Route to user post page
router.get('/post', postController.post);

module.exports = router;
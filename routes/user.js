const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');


// Route to user profile page
router.get('/profile', passport.checkAuthentication, userController.profile);

// Route to sign up page
router.get('/sign-up', userController.signup);
// Route to sign in page
router.get('/sign-in', userController.signin);

// Route to create user
router.post('/create-user', userController.createUser);

// Route to create session
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' }
), userController.createSession);

// Route to sign out
router.get('/sign-out', userController.destroySession);

module.exports = router;
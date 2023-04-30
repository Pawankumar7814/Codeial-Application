const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

// To check that the route index file is loaded or not.
// console.log('Router loaded');

// Route to home page
router.get('/', homeController.home);

// Route to user pages
router.use('/users', require('./user'));
// Route to post pages
router.use('/posts', require('./posts'));

module.exports = router;
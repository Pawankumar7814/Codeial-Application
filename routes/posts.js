//Import modules and models
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post_controller');

// Route to user post page
router.post('/add-new-post', postController.postCreate);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    createPost,
    readPosts,
    updatePost,
    deletePost
} = require('../controllers/postController');

const { protect } = require('../middleware/jwtMiddleware')

// CREATING AND READING POSTS
router.route('/').post(protect, createPost).get(protect, readPosts);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    logInUser,
    registerUser,
    recoverUser,
    getUserPosts
} = require('../controllers/userController');

const { protect } = require('../middleware/jwtMiddleware');

// LOGIN ROUTE
router.post("/login", logInUser);

// REGISTER ROUTE
router.post("/register", registerUser);

// FORGOTTEN PASSWORD ROUTE
router.put("/login/recover", recoverUser);

// RETRIEVE USER POSTS
router.get("/me", protect, getUserPosts)

module.exports = router;
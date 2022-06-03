const express = require('express');
const router = express.Router();

const {
    logInUser,
    registerUser,
    recoverUser
} = require('../controllers/userController');

// LOGIN ROUTE
router.post("/login", logInUser);

// REGISTER ROUTE
router.post("/register", registerUser);

// FORGOTTEN PASSWORD ROUTE
router.put("/login/recover", recoverUser);

module.exports = router;
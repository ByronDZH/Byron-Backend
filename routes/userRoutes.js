const express = require('express');
const router = express.Router();

const { register, login } = require('../services/user/userController');

// Register new user
router.post('/register', register);

// Login existing user
router.post('/login', login);

module.exports = router;
// Import user routes for registration and login
// This file handles user-related routes such as registration and login
// It uses the userController to process requests and responses
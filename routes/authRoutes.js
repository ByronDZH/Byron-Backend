const express = require('express');
const router = express.Router();
const authController = require('../services/auth/authController');  // Import the controller

// Routes for authentication
router.post('/register', authController.register);  // User registration
router.post('/login', authController.login);  // User login

module.exports = router;

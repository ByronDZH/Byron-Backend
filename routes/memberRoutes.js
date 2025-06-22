// /routes/memberRoutes.js
const express = require('express');
const router = express.Router();
const memberController = require('../services/clan/memberController');

// Routes for Guild Member CRUD
router.get('/', memberController.getAllMembers);      // Get all members
router.post('/', memberController.createMember);      // Create new member
router.get('/:id', memberController.getMemberById);   // Get one member
router.put('/:id', memberController.updateMember);    // Update member
router.delete('/:id', memberController.deleteMember); // Delete member

module.exports = router;
// This code defines the routes for managing guild members in a Node.js application using Express.
// It includes routes for getting all members, creating a new member, getting a member by ID, updating a member, and deleting a member.

const express = require('express'); // Import express to create a router
const router = express.Router(); // Create a new router instance for novel-related routes
const auth = require('../middleware/auth'); // Middleware for authentication

const {
  getAllNovels,
  getNovelById,
  createNovel,
  updateNovel,
  deleteNovel
} = require('../services/novel/novelController'); // Import the novel controller functions for handling requests

// Protected routes
router.get('/', auth, getAllNovels); // Get all novels
router.post('/', auth, createNovel); // Create a new novel
router.get('/:id', auth, getNovelById); // Get a novel by ID
router.put('/:id', auth, updateNovel); // Update a novel by ID
router.delete('/:id', auth, deleteNovel); // Delete a novel by ID

module.exports = router;
// This file handles novel-related routes such as fetching, creating, updating, and deleting novels
const express = require('express');
const router = express.Router();
const novelController = require('../services/novel/novelController');  // Import the controller

// Routes for CRUD operations on novels
router.get('/', novelController.getAllNovels);  // Get all novels
router.post('/', novelController.createNovel);  // Create a new novel
router.get('/:id', novelController.getNovelById);  // Get a novel by its ID
router.put('/:id', novelController.updateNovel);  // Update a novel's details
router.delete('/:id', novelController.deleteNovel);  // Delete a novel

module.exports = router;

const express = require('express');
const router = express.Router();
const readingHistoryController = require('../services/readingHistory/readingHistoryController');  // Import the controller

// Routes for CRUD operations on reading history
router.get('/', readingHistoryController.getAllReadingHistory);  // Get all reading history
router.post('/', readingHistoryController.createReadingHistory);  // Create a new reading session
router.get('/:id', readingHistoryController.getReadingHistoryById);  // Get a reading history entry by ID
router.put('/:id', readingHistoryController.updateReadingHistory);  // Update a reading history entry
router.delete('/:id', readingHistoryController.deleteReadingHistory);  // Delete a reading history entry

module.exports = router;

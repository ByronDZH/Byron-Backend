const mongoose = require('mongoose');

// Define the schema for reading history
const readingHistorySchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    chaptersRead: { type: Number, default: 0 },
    status: { type: String, enum: ['reading', 'finished', 'abandoned'], default: 'reading' },
    comment: { type: String }
});

// Create the Mongoose model for the reading history
const ReadingHistory = mongoose.model('ReadingHistory', readingHistorySchema);

module.exports = ReadingHistory;
const mongoose = require('mongoose');

// Define the novel schema based on your requirements
const novelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    readingHistory: [{ 
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        chaptersRead: { type: Number, default: 0 },
        status: { type: String, enum: ['reading', 'finished', 'abandoned'], default: 'reading' },
        comment: { type: String }
    }],
    totalChapters: { type: Number },
    url: { type: String },
    genre: { type: String },
    originalLanguage: { type: String, enum: ['Chinese', 'Japanese', 'Korean', 'Other'], default: 'Other' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Create the Mongoose model based on the schema
const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;

const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: {
        type: String,
        enum: ['reading', 'finished', 'abandoned', 'dropped', 'on-hold'],
        default: 'reading',
    },
    chapters: { type: Number, default: 0 }, // last chapter read
    totalChapters: { type: Number },
    approximateDateRead: { type: Date }, // Optional field
    originalLanguage: {
        type: String,
        enum: ['Chinese', 'Japanese', 'Korean', 'English', 'Other', 'Unknown'],
        default: 'Unknown',
    },
    genre: { type: String },
    url: { type: String },
    notes: { type: String },
}, { timestamps: true });

const Novel = mongoose.model('Novel', novelSchema);

module.exports = Novel;

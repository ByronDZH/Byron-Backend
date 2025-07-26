const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    status: {
        type: String,
        enum: ['reading', 'finished', 'abandoned', 'on-hold', 'dropped'],
        default: 'reading',
    },
    chapters: { type: Number, default: 0 },
    totalChapters: { type: Number }, // optional
    notes: { type: String },         // personal user notes

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Novel', novelSchema);
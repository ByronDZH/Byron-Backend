const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rank: {
        type: String,
        enum: ['Leader', 'Officer', 'Member', 'Recruit'],
        required: true
    },
    joinDate: {
        type: Date,
        required: true,
        // Recommend storing as first day of month, e.g., new Date('2023-06-01')
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    notes: { type: String }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;

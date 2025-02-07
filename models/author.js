const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    nationality: { type: String },
    dateOfBirth: { type: Date },
  },
  { timestamps: true }
);

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: Date,
  biography: String
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;

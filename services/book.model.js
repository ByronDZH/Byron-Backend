const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true},
  description: { type: String, required: true },
  genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: false },
  year: { type: Number, required: true, min: 1000, max: new Date().getFullYear() },
  chapters: { type: Number, min: 1 },
  volumes: { type: Number, min: 1 },
  status: {
    type: String, required: true},
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: false },
}, {timestamps:true}
);

bookSchema.index({ title: 'text', description: 'text' });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

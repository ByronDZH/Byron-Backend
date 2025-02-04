const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  year: { type: Number, required: true },
  genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
  synopsis: String,
  rating: Number,
  reviews: [{
    user: String,
    comment: String,
    rating: Number
  }]
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;

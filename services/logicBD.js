const Book = require('../services/book.model');

const newBookDB = async (book) => await Book.create(book);
const getBookDB = async () => await Book.find();
const delBookIDDB = async (id) => await Book.deleteOne({ _id: id });
const delBookDB = async () => await Book.deleteMany();

module.exports = {
    newBookDB,
    getBookDB,
    delBookIDDB,
    delBookDB,
};
const express = require('express');
const Book = require('../models/book');
const auth = require('../middleware/auth');

const router = express.Router();

// Obtener todos los libros (abierto al público)
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar un nuevo libro (requiere autenticación)
router.post('/books', auth, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un libro (requiere autenticación)
router.put('/books/:id', auth, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro (requiere autenticación)
router.delete('/books/:id', auth, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

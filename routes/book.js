const express = require('express');
const Book = require('../services/book.model');

const router = express.Router();

// Obtener todos los libros
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Agregar un nuevo libro
router.post('/books', async (req, res) => {
  console.log('📥 Datos recibidos en el backend:', req.body); // 🔍 Verificar datos enviados

  const { title, description, genre_id, year, chapters, volumes, status, author_id  } = req.body;

  if (!title || !description || !year || !status ||author_id) {
    return res.status(400).json({ message: "❌ Error: Campos obligatorios " });
  }

  try {
    const newBook = new Book({ title, description, genre_id, year, chapters, volumes, status, author_id });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('❌ Error al guardar el libro:', error);
    res.status(500).json({ message: "❌ Error interno del servidor", error });
  }
});

// Actualizar un libro
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro
router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

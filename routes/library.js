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
router.post('/books', async (req, res) => {
  console.log('📥 Datos recibidos en el backend:', req.body); // 🔍 Verificar datos enviados

  const { title, author_id, year, genre_id, synopsis, rating } = req.body;

  if (!title || !year) {
    return res.status(400).json({ message: "❌ Error: Título y año son obligatorios" });
  }

  try {
    const newBook = new Book({ title, author_id, year, genre_id, synopsis, rating });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('❌ Error al guardar el libro:', error);
    res.status(500).json({ message: "❌ Error interno del servidor", error });
  }
});



// Actualizar un libro (requiere autenticación)
router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro (requiere autenticación)
router.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

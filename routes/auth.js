const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

// REGISTRO DE USUARIO
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    // Crear nuevo usuario
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// INICIO DE SESIÓN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales incorrectas' });

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Credenciales incorrectas' });

    // Generar token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

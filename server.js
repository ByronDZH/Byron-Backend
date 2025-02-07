require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Configuración
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT || 3000;
const PREFIX = process.env.PREFIX || ''; // Prefijo para las rutas

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // 🔹 Permitir todas las conexiones (para pruebas)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Importar rutas con prefijo
const bookRoutes = require('./routes/book');
app.use(PREFIX, bookRoutes);  // 🔹 Agregar prefijo a todas las rutas

// Conexión a MongoDB
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("📌 Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error en la conexión a MongoDB Atlas:", err));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

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
app.use(cors());

// Conexión a MongoDB
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("📌 Conectado a MongoDB Atlas"))
    .catch(err => console.error("❌ Error en la conexión a MongoDB Atlas:", err));

// Importar rutas con prefijo
const bookRoutes = require('./routes/library');
app.use(PREFIX, bookRoutes);  // 🔹 Agregar prefijo a todas las rutas

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

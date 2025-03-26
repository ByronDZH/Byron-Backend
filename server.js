require('dotenv').config();  // Load environment variables from the .env file
const express = require('express');  // Import Express framework
const mongoose = require('mongoose');  // Import Mongoose for MongoDB interaction
const cors = require('cors');  // Import CORS middleware for handling cross-origin requests

const app = express();  // Create an Express app

// Middleware setup
app.use(express.json());  // To parse incoming JSON request bodies
app.use(cors({
    origin: '*', // Allow all connections (adjust for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Set up the environment variables from the .env file
const DATABASE = process.env.DATABASE;  // MongoDB connection URL
const PORT = process.env.PORT || 3000;  // Port to run the server on
const PREFIX = process.env.PREFIX || '';  // Prefix for routes, like "/api"

// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));

// Import routes for novels, reading history, and authentication
const novelRoutes = require('./routes/novelRoutes');  // Routes for novels
const readingHistoryRoutes = require('./routes/readingHistoryRoutes');  // Routes for reading history
const authRoutes = require('./routes/authRoutes');  // Routes for authentication

// Use the routes with a defined prefix
app.use(`${PREFIX}/novels`, novelRoutes);  // For /novels endpoint
app.use(`${PREFIX}/reading-history`, readingHistoryRoutes);  // For /reading-history endpoint
app.use(`${PREFIX}/auth`, authRoutes);  // For /auth endpoint

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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
const systemRoutes = require('./routes/systemRoutes'); // Routes for system health checks
const userRoutes = require('./routes/userRoutes');  // Routes for user registration and login

// Use the routes with a defined prefix
app.use(`${PREFIX}/novels`, novelRoutes);  // For /novels endpoint with authentication
app.use(`${PREFIX}/system`, systemRoutes);  // For /system endpoint
app.use(`${PREFIX}/users`, userRoutes);  // For /users endpoint

//
// Health check endpoint to keep the service alive
// app.get(`${PREFIX}/ping`, (req, res) => {
//     res.status(200).json({ message: 'Pong! Service is running.' });
// });
//

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

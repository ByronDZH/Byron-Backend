const express = require('express');
const router = express.Router();

// Health check / keep-alive endpoint
router.get('/ping', (req, res) => {
    res.status(200).json({ message: 'Pong! Service is running.', timestamp: new Date().toISOString() });
});

module.exports = router;

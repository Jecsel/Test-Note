// errorHandling.js
const express = require('express');
const router = express.Router();

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

module.exports = router;

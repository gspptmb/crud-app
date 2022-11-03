const express = require('express');

//Express Router
const router = express.Router();

//Send incoming routes to specific files
router.use('/users', require('./users'));

//Error handler
router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;

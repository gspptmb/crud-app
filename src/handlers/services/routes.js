const express = require('express');

//Express Router
const router = express.Router();

//Send incoming routes to specific files
router.use('/users', require('../../handlers/services/users'));
router.use('/auth', require('../../handlers/services/users'));

//Error handler
router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    fetchAllUsers,
    fetchOneUser,
    deleteExistingUser,
    updateUser,
} = require('../controllers/user');

//Middleware
const isLoggedIn = require('./middleware');

//User Routes
router.get('/me', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await fetchOneUser(req.user));
    } catch (err) {
        next(err);
    }
});

router.get('/all_users', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await fetchAllUsers());
    } catch (err) {
        next(err);
    }
});

router.delete('/remove_user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteExistingUser(req.user));
    } catch (err) {
        next(err);
    }
});

router.put('/update_user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await updateUser(req.body, req.user));
    } catch (err) {
        next(err);
    }
});

module.exports = router;

const express = require('express');
const { User } = require('../../models/index');
const { fetchAllUsers, fetchOneUser } = require('../../services/users/read');
const {
    deleteExistingUser,
    updateUser,
    registerUser,
} = require('../../services/users/write');

const router = express.Router();

//Custom Middleware
const isLoggedIn = async (req, res, next) => {
    try {
        req.user = await User.findByToken(req.headers.auth);
        next();
    } catch (err) {
        next(err);
    }
};

// Login
router.post('/authenticate', async (req, res, next) => {
    try {
        res.status(200).send({ token: await User.authenticate(req.body) });
    } catch (err) {
        next(err);
    }
});

//Create new user on signup page and send back JWT.
router.post('/register', async (req, res, next) => {
    try {
        res.status(200).send({ token: await registerUser(req.body) });
    } catch (err) {
        next(err);
    }
});

//User Routes
router.get('/one_user_byToken', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await fetchOneUser(req.user.id));
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

router.delete('/user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteExistingUser(req.user.id));
    } catch (err) {
        next(err);
    }
});

router.patch('/user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await updateUser(req.body, req.user));
    } catch (err) {
        next(err);
    }
});

module.exports = { router, isLoggedIn };

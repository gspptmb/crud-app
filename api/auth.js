const express = require('express');
const router = express.Router();
const { User } = require('../db/models');

// Login
router.post('/login', async (req, res, next) => {
    try {
        res.status(200).send({ token: await User.authenticate(req.body) });
    } catch (err) {
        next(err);
    }
});

//Create new user on signup page and send back JWT.
router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).send({ token: await user.generateToken() });
    } catch (err) {
        next(err);
    }
});
module.exports = router;

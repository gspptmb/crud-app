const express = require('express');
const {User} = require('../../models/index')
const {fetchAllUsers, fetchOneUser} = require('../../services/users/read');
const {deleteExistingUser, updateUser} = require('../../services/users/write');

const router = express.Router();


//Middleware
const isLoggedIn = require('../../../api/middleware');


// Login
router.post('/authenticate', async (req, res, next) => {
  try {
      res.status(200).send({ token: await user.authenticate(req.body) });
  } catch (err) {
      next(err);
  }
});

//Create new user on signup page and send back JWT.
router.post('/register', async (req, res, next) => {
  try {
      const user = await User.create(req.body);
      res.status(200).send({ token: await user.generateToken() });
  } catch (err) {
      next(err);
  }
});


//User Routes
router.get('/one_user_byToken', isLoggedIn, async (req, res, next) => {
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

router.delete('/user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(204).send(await deleteExistingUser(req.user.id)); 
    } catch (err) {
        next(err);
    }
});

router.put('/user', isLoggedIn, async (req, res, next) => {
    try {
        res.status(200).send(await updateUser(req.body, req.user));
    } catch (err) {
        next(err);
    }
});

module.exports = router;

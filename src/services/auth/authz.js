const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/index')
const router = express.Router();
const SALT_ROUNDS = 5;


    //Set up password hashing for Sequlize Hook "beforeCreate"
    const hashPassword = async (user) => {
      if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
      }
  };

  //Instance method to compare the user enetered password to the hashed password using bcrypt.
  User.prototype.correctPassword = function (unknownPass) {
      return bcrypt.compare(unknownPass, this.password);
  };

  /*Instance method to generate jwt after correctpassword validates, token will be sent to the 
  frontend until user's session is terminated. 
  */
  User.prototype.generateToken = function () {
      return jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  };

  //Class method used for checking if the user's account exists.
  User.authenticate = async function ({ username, password }) {
      //Check to see if username exists in the db.
      const user = await User.findOne({ where: { username } });
      //If username is false or password is incorrect, tell the user their inputs will not work.
      //Need "await" for correctpassowrd to query User model with "this".
      if (!user || !(await user.correctPassword(password))) {
          const unauthorizedErr = Error('Invalid password or username.');
          unauthorized.status = 401;
          throw unauthorizedErr;
          //Otherwise, generate a jwt token and send it to the user.
      } else {
          return user.generateToken();
      }
  };

  // Class method that finds the user by their token for all requests.
  User.findByToken = async function (token) {
      // Grab id from JWT token using the secret to find user.
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(id);
      if (!user) {
          const invalidToken = Error('Token is no longer valid');
          invalidToken.status = 401;
          throw invalidToken;
      } else {
          return user;
      }
  };

  //Sequlize Hooks
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);


module.exports = router;
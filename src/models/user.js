const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            password: { type: DataTypes.STRING, allowNull: false },
        },
        {}
    );
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


    return User;
};


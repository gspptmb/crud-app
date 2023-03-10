const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 5;

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

    //Set up password hashing for Sequlize Hook "beforeCreate"
    const hashPassword = async (user) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
    };

    //Class method used for checking if the user's account exists.
    User.authenticate = async function (payload) {
        const { username, password } = payload;
        //Check to see if username exists in the db.
        const user = await User.findOne({ where: { username } });
        //If username is false or password is incorrect, tell the user their inputs will not work.
        //Need "await" for correctpassowrd to query User model with "this".
        if (!user || !(await user.correctPassword(password))) {
            const unauthorizedErr = Error('Invalid password or username.');

            unauthorizedErr.status = 401;
            return unauthorizedErr;
            //Otherwise, generate a jwt token and send it to the user.
        } else {
            return user.generateToken();
        }
    };

    // Class method that finds the user by their token for all requests.
    User.findByToken = async function (token) {
        // Grab id from JWT token using the secret to find user.
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            return await User.findByPk(id);
        } catch {
            const invalidToken = Error(
                'Token is either Invalid or has expired.'
            );
            invalidToken.status = 401;
            return invalidToken;
        }
    };

    //Sequlize Hooks
    User.beforeCreate(hashPassword);
    User.beforeUpdate(hashPassword);

    return User;
};

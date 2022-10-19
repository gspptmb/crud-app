const { User } = require('../src/models');

const isLoggedIn = async (req, res, next) => {
    try {
        req.user = await User.findByToken(req.headers.auth);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isLoggedIn;

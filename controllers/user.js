const { User } = require('../db/models');

//Get all users in database then send to front end.
const fetchAllUsers = async () => {
    const users = await User.findAll();
    return users;
};
const fetchOneUser = async ({ id }) => {
    const user = await User.findByPk(id);
    return user;
};

//Deletes an existing user in the database
const deleteExistingUser = async ({ id }) => {
    if (!id) {
        throw new Error('User object either not found or missing id');
    } else {
        const userToRemove = await User.findByPk(id);
        userToRemove.destroy();
    }
};

//Updates an existings users username and password
const updateUser = async (body, user) => {
    const { id } = user;
    const { username, password } = body;
    if (!id) {
        throw new Error('User object either not found or missing id');
    } else {
        const userToUpdate = await User.findByPk(id);
        await userToUpdate.update({ username });
        await userToUpdate.update({ password });
        await userToUpdate.save();
        return 'User information updated.';
    }
};

module.exports = {
    fetchAllUsers,
    fetchOneUser,
    deleteExistingUser,
    updateUser,
};

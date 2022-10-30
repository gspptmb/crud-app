const { User } = require('../../models/index');

const registerUser = async (credentials) => {
    const { username } = credentials;
    const { password } = credentials;
    if (await User.findOne({ where: { username } })) {
        return Error('This user is already activated.');
    } else {
        const new_user = await User.create({ username, password });
        const token = await new_user.generateToken();
        return token;
    }
};

//Deletes an existing user in the database
const deleteExistingUser = async (id) => {
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
    if (await User.findOne({ where: { username } })) {
        return Error(
            "Sorry, we can't let you do that. This username is already taken."
        );
    }
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
    deleteExistingUser,
    updateUser,
    registerUser,
};

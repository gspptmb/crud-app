const {User} = require('../../models/user')

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
  deleteExistingUser,
  updateUser
}
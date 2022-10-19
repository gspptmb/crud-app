const { User } = require('../../models/user');

const fetchAllUsers = async () => {
  const users = await User.findAll();
  return users;
};
const fetchOneUser = async ({ id }) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  fetchAllUsers, 
  fetchOneUser
}
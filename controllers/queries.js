const {
  getUserByEmail,
  addNewUser,
  checkUserCredentials,
  getUserById,
  getUserBiography,
  updateUserBiography,
  getUsers
} = require("../database/queries");

module.exports = {
  getUserByEmail,
  addNewUser,
  checkUserCredentials,
  getUserById,
  getUserBiography,
  updateUserBiography,
  getUsers
};

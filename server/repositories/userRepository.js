// repositories/userRepository.js

const { User } = require('../models_objects');

/**
 * Repository: getAllUsers
 * ------------------------
 * Retrieves all users from the database.
 *
 * @returns {Promise<Array>} List of user records.
 */
const getAllUsers = async () => {
  return await User.findAll();
};





module.exports = {
  getAllUsers
};
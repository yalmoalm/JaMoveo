// repositories/authRepository.js

/**
 * Auth Repository
 * ----------------
 * Provides data access functions for user authentication and registration.
 * Handles operations such as user lookup by username (for login) and user creation (for signup).
 */

const { User, Role } = require('../models_objects');

/**
 * Finds a user by their username, including their password hash and role.
 * 
 * Used during login to validate credentials and determine access role.
 * 
 * @param {string} username - The username to search for.
 * @returns {Promise<{
 *   id: number,
 *   username: string,
 *   password_hash: string,
 *   role: string
 * } | null>}
 * Returns a simplified user object or null if user not found.
 */
const findByUsername = async (username) => {
  // Query the database for a user by username
  const user = await User.findOne({
    where: { username },
    include: {
      model: Role,
      as: 'role',
      attributes: ['name'] // Only fetch the role name (e.g., "admin" or "player")
    },
    attributes: ['id', 'username', 'password_hash'] // Include password_hash for credential check
  });

  // Return null if user doesn't exist
  if (!user) return null;

  // Return a flat, safe user object
  return {
    id: user.id,
    username: user.username,
    password_hash: user.password_hash,
    role: user.role?.name || null
  };
};

/**
 * Creates a new user in the database.
 * 
 * Used during signup. Stores the password as-is (not hashed).
 * In production, you should hash the password before storing.
 * 
 * @param {Object} userData - Object containing new user details.
 * @param {string} userData.username - Desired username.
 * @param {string} userData.password - Password (stored as plaintext).
 * @param {string} userData.instrument - Instrument played by the user.
 * @param {number} userData.role_id - ID of the role to assign (foreign key).
 * @returns {Promise<User>} The Sequelize User instance created.
 */
const createUser = async ({ username, password, instrument, role_id }) => {
  return await User.create({
    username,
    password_hash: password,
    instrument,
    role_id
  });
};

// Export repository functions
module.exports = {
  findByUsername,
  createUser
};

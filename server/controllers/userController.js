// controllers/userController.js

/**
 * User Controller
 * ----------------
 * Handles HTTP logic related to user management.
 * This module is only responsible for receiving requests and sending responses.
 * 
 * Business rules and data access are delegated to repositories and middleware.
 */

const userRepository = require('../repositories/userRepository');

/**
 * Controller: getAllUsers
 * ------------------------
 * Retrieves all registered users from the database,
 * including their username, instrument, and role.
 * 
 * This endpoint should be protected by middleware (e.g., requireRole(['admin']))
 * to ensure that only administrators can access the user list.
 * 
 * @route GET /api/users
 * @access Protected (admin only)
 */
const getAllUsers = async (req, res) => {
  try {
    // Fetch users through the repository layer (with roles included)
    const users = await userRepository.getAllUsers();

    // Send back the list of users in JSON format
    return res.status(200).json(users);

  } catch (err) {
    // Log the error for server-side debugging
    console.error("Error in getAllUsers controller:", err);

    // Respond with a generic error message
    return res.status(500).json({ message: "Internal server error: failed to retrieve users" });
  }
};

module.exports = {
  getAllUsers
};

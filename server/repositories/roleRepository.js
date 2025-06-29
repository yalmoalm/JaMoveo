// repositories/roleRepository.js

/**
 * Role Repository Module
 * ----------------------
 * Provides access functions to the 'roles' table in the database.
 * This module is used to fetch role information and verify the existence
 * of specific roles, in order to manage permissions and user types (e.g., 'admin', 'player').
 */

const { Role } = require('../models_objects');

/**
 * Finds a role by its name.
 * 
 * Used primarily during login or user setup, to fetch the role record
 * based on a string such as "admin" or "player".
 * 
 * @param {string} name - The role name to search for (e.g., "admin").
 * @returns {Promise<{ id: number, name: string } | null>} - Returns a minimal role object or null if not found.
 */
const findRoleByName = async (name) => {
  // Query the 'roles' table, searching by role name.
  // Only select the 'id' and 'name' fields for security and performance.
  const role = await Role.findOne({
    where: { name },
    attributes: ['id', 'name']
  });

  // Return the role object as plain JSON (not Sequelize instance), or null if not found
  return role ? role.toJSON() : null;
};

/**
 * Checks if a given role name exists in the database.
 * 
 * Useful in authorization middleware to verify if the role provided
 * in the request header (e.g., from `x-user`) is a legitimate role.
 * 
 * @param {string} name - The name of the role to validate.
 * @returns {Promise<boolean>} - Returns true if the role exists, false otherwise.
 */
const isValidRole = async (name) => {
  // Attempt to find the role by name; only need the ID for validation.
  const role = await Role.findOne({
    where: { name },
    attributes: ['id']
  });

  // Return true if the role was found, false otherwise
  return !!role;
};

/**
 * Retrieves all available roles from the database.
 * 
 * This function can be used for administrative tools, debugging,
 * or user interfaces that allow role selection or display.
 * 
 * @returns {Promise<Array<{ id: number, name: string }>>} - List of all roles with their IDs and names.
 */
const getAllRoles = async () => {
  // Fetch all role records, ordered by ID for consistency.
  const roles = await Role.findAll({
    attributes: ['id', 'name'],
    order: [['id', 'ASC']]
  });

  // Convert all Sequelize instances to plain JSON
  return roles.map(role => role.toJSON());
};

// Export the repository functions
module.exports = {
  findRoleByName,
  isValidRole,
  getAllRoles
};

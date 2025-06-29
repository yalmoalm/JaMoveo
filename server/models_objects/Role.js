// models_objects/Role.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

/**
 * Model: Role
 * -----------
 * Represents a user role (e.g., 'admin', 'player').
 * Used to control access rights and permissions for different users.
 */
const Role = sequelize.define('Role', {
  /**
   * ID (Primary Key)
   * Unique identifier for each role.
   */
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  /**
   * Name
   * Human-readable name of the role (e.g., 'admin').
   */
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }

}, {
  tableName: 'roles',    // Explicit table name
  timestamps: false      // Disable createdAt/updatedAt
});

/**
 * Static Method: seedDefaultRoles
 * -------------------------------
 * Ensures that required roles ('admin', 'player') exist in the database.
 * Call this after syncing models.
 */
Role.seedDefaultRoles = async function () {
  const defaultRoles = ['admin', 'player'];

  for (const roleName of defaultRoles) {
    const exists = await Role.findOne({ where: { name: roleName } });
    if (!exists) {
      await Role.create({ name: roleName });
    }
  }
};

module.exports = Role;

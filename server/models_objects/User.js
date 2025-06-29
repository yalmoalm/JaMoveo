// models_objects/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Role = require('./Role');

// Define the User model representing registered users in the system
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,         // Unique identifier for each user
    autoIncrement: true       // Auto-incremented ID
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,         // Username is required
    unique: true              // Each username must be unique
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false          // Password (hashed) must be provided
  },
  instrument: {
    type: DataTypes.STRING,
    allowNull: false          // Musical instrument associated with the user
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,         // Role ID is required
    references: {
      model: Role,
      key: 'id'                // Foreign key to roles table
    }
  }
}, {
  tableName: 'users',         // Explicitly map to 'users' table
  timestamps: false           // Disable automatic timestamps (createdAt, updatedAt)
});


module.exports = User;

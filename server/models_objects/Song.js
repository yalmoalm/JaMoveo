const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// Define the 'Song' model to represent the 'songs' table
const Song = sequelize.define('Song', {
  // Primary key with auto-increment
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Name of the song
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'songs',     // Explicitly map to 'songs' table
  timestamps: false,      // Disable automatic timestamps
});

module.exports = Song;

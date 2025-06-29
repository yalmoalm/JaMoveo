const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

// Define the 'SongLine' model to represent individual words/lines in a song
const SongLine = sequelize.define('SongLine', {
  // Primary key with auto-increment
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // Foreign key referencing the parent song
  song_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Line number within the song
  line_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Order of the word within the line
  word_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // The actual lyric word
  lyrics: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Associated chord (optional)
  chords: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'song_lines', // Explicitly map to 'song_lines' table
  timestamps: false,       // Disable automatic timestamps
});

module.exports = SongLine;

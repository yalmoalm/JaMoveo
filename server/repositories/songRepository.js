// repositories/songRepository.js

/**
 * Song Repository Module
 * ----------------------
 * Encapsulates all data access logic related to 'songs' and 'song_lines' tables.
 * Follows Repository Pattern for separation of concerns and testability.
 */

const { Song, SongLine } = require('../models_objects');
const sequelize = require('../db/sequelize');

/**
 * Fetches all songs with minimal metadata (id and name only).
 * Used for song listing and dropdown population.
 * 
 * @returns {Promise<Song[]>} List of songs with basic information.
 */
const getAllSongs = async () => {
  return await Song.findAll({
    attributes: ['id', 'name']
  });
};

/**
 * Retrieves a single song by name (case-insensitive) along with its associated lines.
 * Results are sorted by line number for correct display order.
 * 
 * @param {string} name - The name of the song to retrieve.
 * @returns {Promise<Song|null>} The song object including its lines, or null if not found.
 */
const getSongByName = async (name) => {
  return await Song.findOne({
    where: sequelize.where(
      sequelize.fn('LOWER', sequelize.col('name')), // Convert DB column to lowercase
      sequelize.fn('LOWER', name)                   // Convert input name to lowercase
    ),
    include: {
      model: SongLine,
      as: 'lines',
      attributes: ['id', 'lyrics', 'chords', 'line_number'],
    },
    order: [[{ model: SongLine, as: 'lines' }, 'line_number', 'ASC']]
  });
};

/**
 * Creates a new song entry and bulk inserts all its lines from parsed JSON structure.
 * This function assumes the structure is a 2D array: lines → words, with optional chords.
 * 
 * @param {string} songName - The name to assign to the song (usually from filename).
 * @param {Array[]} jsonData - Array of lines, each containing an array of word objects.
 * @returns {Promise<Song>} The newly created Song instance.
 */
const uploadSongFromJson = async (songName, jsonData) => {
  // Insert song metadata
  const newSong = await Song.create({ name: songName });

  const linesToInsert = [];

  // Iterate over each line and word to build structured rows for bulk insert
  for (let i = 0; i < jsonData.length; i++) {
    const line = jsonData[i];
    for (let j = 0; j < line.length; j++) {
      const word = line[j];
      linesToInsert.push({
        song_id: newSong.id,
        lyrics: word.lyrics,
        chords: word.chords || null,
        line_number: i + 1,   // Line numbering starts at 1
        word_order: j + 1     // Word ordering within line
      });
    }
  }

  // Perform bulk insert of all song lines in one transaction
  await SongLine.bulkCreate(linesToInsert);

  return newSong;
};

/**
 * Deletes a song by name, including all its associated lines.
 * 
 * @param {string} name - The name of the song to delete.
 * @returns {Promise<boolean>} True if song was found and deleted; false otherwise.
 */
const deleteSongByName = async (name) => {
  const song = await Song.findOne({ where: { name } });
  if (!song) return false;

  // Delete child rows (SongLines) before deleting the parent (Song)
  await SongLine.destroy({ where: { song_id: song.id } });
  await song.destroy();

  return true;
};

// Export repository functions
module.exports = {
  getAllSongs,
  getSongByName,
  uploadSongFromJson,
  deleteSongByName,
};

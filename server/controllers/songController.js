// controllers/songController.js

const songRepository = require('../repositories/songRepository');
const fs = require('fs');
const path = require('path');

/**
 * Controller: getAllSongs
 * ------------------------
 * Retrieves a list of all songs using the song repository.
 */
exports.getAllSongs = async (req, res) => {
  try {
    const songs = await songRepository.getAllSongs();
    return res.status(200).json(songs);
  } catch (err) {
    console.error("Error in getAllSongs:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller: getSongByName
 * --------------------------
 * Retrieves a song with its lines by name using the song repository.
 */
exports.getSongByName = async (req, res) => {
  try {
    const name = req.params.name;
    const song = await songRepository.getSongByName(name);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    return res.status(200).json(song);
  } catch (err) {
    console.error("Error in getSongByName:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller: uploadSongFromJson
 * -------------------------------
 * Handles upload of a song via JSON file and delegates persistence to the repository.
 * Expects a multipart form-data with 'jsonFile'.
 * 
 * @route   POST /api/songs/upload-json
 * @access  Public
 */
exports.uploadSongFromJson = async (req, res) => {
  try {
    // Validate that a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Extract filename and parse content
    const originalName = req.file.originalname;
    const songName = path.parse(originalName).name;
    const jsonData = JSON.parse(req.file.buffer.toString('utf8'));

    // Delegate creation logic to repository
    const newSong = await songRepository.uploadSongFromJson(songName, jsonData);

    // Respond with created song
    return res.status(201).json({
      message: "Song uploaded successfully",
      song: newSong
    });

  } catch (err) {
    console.error("Error in uploadSongFromJson:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller: deleteSongByName
 * -----------------------------
 * Deletes a song and its associated lines using the song repository.
 */
exports.deleteSongByName = async (req, res) => {
  try {
    const songName = req.params.name;
    const deleted = await songRepository.deleteSongByName(songName);

    if (!deleted) {
      return res.status(404).json({ message: 'Song not found' });
    }

    return res.status(200).json({ message: `Song '${songName}' deleted successfully.` });
  } catch (err) {
    console.error("Error in deleteSongByName:", err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

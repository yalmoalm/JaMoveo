// ----------------------------------------------------
//  Song Routes Registration
// ----------------------------------------------------

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Authorization middleware for role-based access
const { requireRole } = require('../middleware/requireRole');

// Import controller functions
const {
  getAllSongs,
  getSongByName,
  uploadSongFromJson,
  deleteSongByName
} = require('../controllers/songController');

/**
 * @route   GET /api/songs
 * @desc    Retrieve all songs (admin only)
 * @access  Admin
 */
router.get('/', requireRole(['admin']), getAllSongs);

/**
 * @route   GET /api/songs/by-name/:name
 * @desc    Retrieve a specific song with all lines (admin only)
 * @access  Admin
 */
router.get('/by-name/:name', requireRole(['admin']), getSongByName);

/**
 * @route   POST /api/songs/upload-json
 * @desc    Upload a song via JSON file (admin only)
 * @access  Admin
 */
router.post('/upload-json', requireRole(['admin']), upload.single('jsonFile'), uploadSongFromJson);

/**
 * @route   DELETE /api/songs/by-name/:name
 * @desc    Delete a song and its lines by name (admin only)
 * @access  Admin
 */
router.delete('/by-name/:name', requireRole(['admin']), deleteSongByName);

// Export the router
module.exports = router;

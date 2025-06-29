// ----------------------------------------------------
//  Session Routes Registration
// ----------------------------------------------------

const express = require('express');
const router = express.Router();

// Import controller functions
const { createSession, endSession } = require('../controllers/sessionController');

// Import role-based access middleware
const { requireRole } = require('../middleware/requireRole');

/**
 * @route   POST /api/sessions
 * @desc    Create a new rehearsal session
 * @access  Protected – accessible to  admin 
 */
router.post('/', requireRole(['admin']), createSession);

/**
 * @route   PATCH /api/sessions/:id/end
 * @desc    End a session (mark it as inactive)
 * @access  Protected – accessible to admin
 */
router.patch('/:id/end', requireRole(['admin']), endSession);

module.exports = router;

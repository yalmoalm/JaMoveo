/**
 * Session Controller
 * ------------------
 * Handles the creation and termination of rehearsal sessions.
 * Delegates data access to the session repository.
 */

const sessionRepository = require('../repositories/sessionRepository');
const { User, Song } = require('../models_objects');

/**
 * Controller: createSession
 * --------------------------
 * Creates a new rehearsal session.
 * Validates the existence and role of the admin and optionally the song.
 * 
 * @route   POST /api/sessions
 * @access  Protected (admin only)
 */
const createSession = async (req, res) => {
  try {
    const { admin_id, current_song_id } = req.body;

    // Validate required field
    if (!admin_id) {
      return res.status(400).json({
        message: "Field 'admin_id' is required to create a session."
      });
    }

    // Load user with associated role using Sequelize association
    const admin = await User.findByPk(admin_id, {
      include: ['role']
    });

    // Validate that user exists and is an admin
    if (!admin || admin.role?.name !== 'admin') {
      return res.status(400).json({
        message: "Invalid admin_id. User not found or not an admin."
      });
    }

    // If song ID is provided, validate that the song exists
    if (current_song_id) {
      const song = await Song.findByPk(current_song_id);
      if (!song) {
        return res.status(400).json({
          message: "Invalid current_song_id. Song not found."
        });
      }
    }

    // Create the session using the repository
    const session = await sessionRepository.createSession(admin_id, current_song_id || null);

    // Return successful creation response
    return res.status(201).json({
      message: "Session created successfully.",
      session
    });

  } catch (err) {
    console.error("Error in createSession:", err);
    return res.status(500).json({
      message: "Failed to create session. Please ensure all IDs are valid.",
      error: err.message
    });
  }
};

/**
 * Controller: endSession
 * -----------------------
 * Marks an existing session as inactive.
 * 
 * @route   PATCH /api/sessions/:id/end
 * @access  Protected (admin only)
 */
const endSession = async (req, res) => {
  const sessionId = req.params.id;

  try {
    // Retrieve the session instance
    const session = await sessionRepository.findSessionById(sessionId);

    // Handle case where session does not exist
    if (!session) {
      return res.status(404).json({
        message: "Session not found."
      });
    }

    // Mark session as inactive and save
    await sessionRepository.endSessionByInstance(session);

    // Return updated session data
    return res.json({
      message: "Session ended successfully.",
      session
    });

  } catch (err) {
    console.error("Error in endSession:", err);
    return res.status(500).json({
      message: "Failed to end session.",
      error: err.message
    });
  }
};

// Export controller methods
module.exports = {
  createSession,
  endSession
};

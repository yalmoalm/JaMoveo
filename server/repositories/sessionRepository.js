// repositories/sessionRepository.js

/**
 * Session Repository
 * ------------------
 * Provides access to the 'sessions' table.
 * Responsible for creating, retrieving, and updating session records.
 */

const { Session } = require('../models_objects');

/**
 * Creates a new session in the database.
 * 
 * This function inserts a new row into the 'sessions' table.
 * It ensures that the session is marked as active upon creation.
 * 
 * NOTE: This function does NOT validate whether admin_id or current_song_id
 * exist in the referenced tables. That must be handled in higher layers,
 * or captured via foreign key constraint errors.
 * 
 * @param {number} adminId - ID of the admin user who initiates the session.
 * @param {number|null} currentSongId - Optional ID of the current song.
 * @returns {Promise<Session>} The newly created session instance.
 * @throws {SequelizeForeignKeyConstraintError} If admin_id or current_song_id are invalid.
 */
const createSession = async (adminId, currentSongId = null) => {
  try {
    const session = await Session.create({
      admin_id: adminId,
      current_song_id: currentSongId,
      is_active: true,
      created_at: new Date()
    });

    return session;

  } catch (err) {
    // Log specific FK violation for clarity
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      console.error("Foreign key constraint failed in createSession:", err);
      throw new Error("Invalid admin_id or current_song_id. Please ensure both exist.");
    }

    // Propagate any other error
    throw err;
  }
};

/**
 * Finds a session by its ID (primary key).
 * 
 * Used to retrieve a specific session for updates or inspection.
 * 
 * @param {number} sessionId - The ID of the session to look up.
 * @returns {Promise<Session|null>} The session instance or null if not found.
 */
const findSessionById = async (sessionId) => {
  return await Session.findByPk(sessionId);
};

/**
 * Ends an active session instance by marking it as inactive.
 * 
 * This method updates the 'is_active' flag and persists the change.
 * 
 * @param {Session} session - A Sequelize session instance.
 * @returns {Promise<Session>} The updated session object after save.
 */
const endSessionByInstance = async (session) => {
  session.is_active = false;
  return await session.save();
};

// Export repository methods
module.exports = {
  createSession,
  findSessionById,
  endSessionByInstance
};

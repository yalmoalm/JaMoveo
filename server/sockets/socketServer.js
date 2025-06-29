// socketServer.js – Manages all Socket.IO logic for the JaMoveo rehearsal app.

const { Server } = require('socket.io');

/**
 * Initializes Socket.IO and defines session-related events.
 * @param {http.Server} server - The HTTP server instance to bind Socket.IO to.
 */
function setupSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Replace with frontend origin in production
      methods: ['GET', 'POST', 'PATCH']
    }
  });

  // Define a namespace for session-related communication
  const sessionNamespace = io.of('/sessions');

  sessionNamespace.on('connection', socket => {
    console.log(`[Socket] Connected: ${socket.id}`);

    /**
     * Join a specific rehearsal session room.
     * @param {string} sessionId - The unique identifier of the session.
     */
    socket.on('join-session', sessionId => {
      const room = `session-${sessionId}`;
      socket.join(room);
      console.log(`[Socket] ${socket.id} joined room: ${room}`);
    });

    /**
     * End a session and notify all participants to log out.
     * Triggered by the admin.
     * @param {string} sessionId - The ID of the session to terminate.
     */
    socket.on('end-session', sessionId => {
      const room = `session-${sessionId}`;
      sessionNamespace.to(room).emit('force-logout');
      console.log(`[Socket] force-logout emitted to room: ${room}`);
    });

    /**
     * Notify participants that the current song has been updated.
     * Triggered by the admin.
     * @param {Object} payload - Contains sessionId and song data.
     * @param {string} payload.sessionId - The session to update.
     * @param {Object} payload.song - The updated song content.
     */
    socket.on('song-updated', ({ sessionId, song }) => {
      const room = `session-${sessionId}`;
      sessionNamespace.to(room).emit('song-updated', song);
      console.log(`[Socket] song-updated emitted to room: ${room}`);
    });

    /**
     * Handle client disconnection from the namespace.
     */
    socket.on('disconnect', () => {
      console.log(`[Socket] Disconnected: ${socket.id}`);
    });
  });
}

module.exports = { setupSocketIO };

// Import individual model definitions
const User = require('./User');
const Role = require('./Role');
const Song = require('./Song');
const SongLine = require('./SongLine');
const Session = require('./Session');


// Export all models as a single object for centralized access
module.exports = {
  User,
  Role,
  Song,
  SongLine,
  Session,
};
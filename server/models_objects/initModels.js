// initModels.js – Defines Sequelize model associations (relationships) between tables

/**
 * Initializes all model relationships (associations).
 * @param {object} models - An object containing all Sequelize models.
 */
module.exports = function initModels(models) {
  const { User, Role, Song, SongLine, Session } = models;

  // ----------------------------------------------------
  // Role ↔ User: One-to-Many
  // Each Role can have multiple Users
  // Each User belongs to a single Role
  // ----------------------------------------------------
  Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users'
  });

  User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
  });

  // ----------------------------------------------------
  // User (Admin) ↔ Session: One-to-Many
  // Each User (admin) can create multiple Sessions
  // Each Session is created by one admin User
  // ----------------------------------------------------
  User.hasMany(Session, {
    foreignKey: 'admin_id',
    as: 'adminSessions'
  });

  Session.belongsTo(User, {
    foreignKey: 'admin_id',
    as: 'admin'
  });

  // ----------------------------------------------------
  // Song ↔ SongLine: One-to-Many
  // Each Song can have many SongLines
  // Each SongLine belongs to a single Song
  // ----------------------------------------------------
  Song.hasMany(SongLine, {
    foreignKey: 'song_id',
    as: 'lines'
  });

  SongLine.belongsTo(Song, {
    foreignKey: 'song_id',
    as: 'song'
  });

  // ----------------------------------------------------
  // Song ↔ Session: One-to-Many
  // A Song can be the current song in multiple Sessions
  // Each Session can have one current Song
  // ----------------------------------------------------
  Song.hasMany(Session, {
    foreignKey: 'current_song_id',
    as: 'sessions'
  });

  Session.belongsTo(Song, {
    foreignKey: 'current_song_id',
    as: 'currentSong'
  });
};

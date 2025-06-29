// models_objects/Session.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

/**
 * Model: Session
 * --------------
 * Represents a live rehearsal session.
 * Each session is created by an admin user and may be linked to a current song.
 */
const Session = sequelize.define('Session', {
  /**
   * ID (Primary Key)
   * Auto-incremented unique identifier for the session.
   */
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  /**
   * Admin ID (Foreign Key)
   * References the user who created the session (must be an admin).
   */
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Table name of User model
      key: 'id',
    },
  },

  /**
   * Current Song ID (Foreign Key)
   * Optionally references the currently active song in the session.
   */
  current_song_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'songs', // Table name of Song model
      key: 'id',
    },
  },

  /**
   * Is Active
   * Indicates whether the session is currently active.
   */
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  /**
   * Created At
   * Timestamp marking when the session was created.
   */
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sessions', // Explicit table name
  timestamps: false,     // Disable Sequelize's automatic timestamp fields
});

/**
 * Model Associations
 * ------------------
 * Define relationships to User (admin) and Song (current_song).
 */
Session.associate = (models) => {
  Session.belongsTo(models.User, {
    foreignKey: 'admin_id',
    as: 'admin',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  Session.belongsTo(models.Song, {
    foreignKey: 'current_song_id',
    as: 'current_song',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
};

module.exports = Session;

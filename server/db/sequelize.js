// db/sequelize.js – Initializes Sequelize connection with SQLite and enforces foreign keys

const { Sequelize } = require('sequelize');
const path = require('path');

// ----------------------------------------------------
//  Initialize Sequelize with SQLite as the database
// ----------------------------------------------------
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, 'jamoveo.db'), // Absolute path to the SQLite database file
  logging: false                                   // Disable SQL query logging (enable for debugging)
});

// ----------------------------------------------------
//  Enable foreign key constraint enforcement for SQLite
// ----------------------------------------------------
async function enableForeignKeys() {
  try {
    await sequelize.query('PRAGMA foreign_keys = ON;');
    // console.log('SQLite foreign key enforcement enabled.');
  } catch (error) {
    console.error('Failed to enable foreign key enforcement:', error);
  }
}

// Call the foreign key enforcement function
enableForeignKeys();

// ----------------------------------------------------
//  Export the configured Sequelize instance
// ----------------------------------------------------
module.exports = sequelize;
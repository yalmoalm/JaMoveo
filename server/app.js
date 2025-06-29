// app.js – Responsible for setting up and configuring the Express application

const express = require('express');
const path = require('path');
const app = express();

// ----------------------------------------------------
//  Middleware Configuration
// ----------------------------------------------------

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS for development and testing
// In production, specify the exact allowed origin
const cors = require('cors');
app.use(cors());

// ----------------------------------------------------
//  Serve Static Files
// ----------------------------------------------------

// Serve all static files from ../client
app.use(express.static(path.join(__dirname, '../client')));

// ----------------------------------------------------
//  Database Models & Relationships Initialization
// ----------------------------------------------------

// Import all Sequelize models
const models = require('./models_objects');

// Import the function that sets up model associations (relations)
const initModels = require('./models_objects/initModels');

// Initialize all associations (e.g., foreign keys, joins)
initModels(models);

// ----------------------------------------------------
//  API Routes
// ----------------------------------------------------

// User-related routes (get users, etc.)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Authentication routes (register, login)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Song-related routes (get songs, upload, delete)
const songRoutes = require('./routes/songRoutes');
app.use('/api/songs', songRoutes);

// Session-related routes (create, close, manage sessions)
const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

// ----------------------------------------------------
//  Health Check Endpoint
// ----------------------------------------------------

// Simple route to verify that the server is running
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'JaMoveo API is running',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
//  Export the app instance
// ----------------------------------------------------

module.exports = app;

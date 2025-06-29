// routes/authRoutes.js

/**
 * Auth Routes
 * -----------
 * Provides HTTP endpoints for user registration (signup) and login.
 * 
 * These endpoints are used to:
 * - Create a new user account with default role 'player'
 * - Create a new user account with role 'admin'
 * - Authenticate existing users and return identity info ('x-user')
 */

const express = require('express');
const router = express.Router();

// Controller functions
const {
  signupUser,
  createAdminUser,
  loginUser
} = require('../controllers/authController');

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user with role 'player'
 * @access  Public
 */
router.post('/signup', signupUser);

/**
 * @route   POST /api/auth/signup-admin
 * @desc    Register a new user with role 'admin'
 * @access  Public
 */
router.post('/create-admin', createAdminUser);
/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user credentials and return minimal identity object
 * @access  Public
 */
router.post('/login', loginUser);

module.exports = router;

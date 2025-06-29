// routes/userRoutes.js

const express = require('express');
const router = express.Router();

// Controller: Handles user-related business logic
const { getAllUsers } = require('../controllers/userController');

// Middleware: Enforces role-based access control
const { requireRole } = require('../middleware/requireRole');

/**
 * @route   GET /api/users
 * @desc    Fetch all users from the database
 * @access  Protected – only accessible to users with the 'admin' role
 */
router.get('/', requireRole(['admin']), getAllUsers);

module.exports = router;


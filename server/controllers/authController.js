// controllers/authController.js

/**
 * Auth Controller
 * ---------------
 * Provides user registration (signup) and authentication (login) logic.
 * 
 * - signupUser: Creates a new player user in the system.
 * - loginUser: Authenticates a user and returns minimal identity data.
 */

const authRepository = require('../repositories/authRepository');
const roleRepository = require('../repositories/roleRepository');

/**
 * Controller: signupUser
 * -----------------------
 * Registers a new user in the system with a default role of 'player'.
 * 
 * The password is stored as plain text. In production, always use hashing.
 * 
 * @route POST /api/auth/signup
 * @access Public
 */
const signupUser = async (req, res) => {
  try {
    const { username, password, instrument } = req.body;

    // Step 1: Validate input
    if (!username || !password || !instrument) {
      return res.status(400).json({
        message: "All fields are required: username, password, and instrument"
      });
    }

    // Step 2: Check if user already exists
    const existing = await authRepository.findByUsername(username);
    if (existing) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Step 3: Find the 'player' role from DB
    const playerRole = await roleRepository.findRoleByName('player');
    if (!playerRole) {
      return res.status(500).json({ message: "Role 'player' not found in database" });
    }

    // Step 4: Create user in DB
    const newUser = await authRepository.createUser({
      username,
      password,
      instrument,
      role_id: playerRole.id
    });

    // Step 5: Return success response
    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        instrument: newUser.instrument,
        role: playerRole.name
      }
    });

  } catch (err) {
    console.error("Error in signupUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller: loginUser
 * ----------------------
 * Authenticates a user by verifying the credentials.
 * Returns a minimal 'x-user' object with id and role name,
 * which is used by the client in subsequent requests.
 * 
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Validate input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Step 2: Find user by username
    const user = await authRepository.findByUsername(username);

    // Step 3: Validate credentials
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Step 4: Return minimal identity object for 'x-user'
    return res.status(200).json({
      message: "Login successful",
      x_user: {
        id: user.id,
        role: user.role
      }
    });

  } catch (err) {
    console.error("Error in loginUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



/**
 * Controller: createAdminUser
 * ----------------------------
 * Creates a new user with the 'admin' role.
 * 
 * @route POST /api/auth/create-admin
 * @access Public (for now – protect in production)
 */
const createAdminUser = async (req, res) => {
  try {
    const { username, password, instrument } = req.body;

    // Validate input
    if (!username || !password || !instrument) {
      return res.status(400).json({
        message: "All fields are required: username, password, and instrument"
      });
    }

    // Check if user already exists
    const existing = await authRepository.findByUsername(username);
    if (existing) {
      return res.status(409).json({ message: "Username already exists" });
    }

    // Get 'admin' role from DB
    const adminRole = await roleRepository.findRoleByName('admin');
    if (!adminRole) {
      return res.status(500).json({ message: "Role 'admin' not found in database" });
    }

    // Create the new admin user
    const newUser = await authRepository.createUser({
      username,
      password,
      instrument,
      role_id: adminRole.id
    });

    return res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        instrument: newUser.instrument,
        role: adminRole.name
      }
    });

  } catch (err) {
    console.error("Error in createAdminUser:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  signupUser,
  loginUser,
  createAdminUser   
};
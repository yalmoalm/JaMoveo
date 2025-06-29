// middleware/requireRole.js

/**
 * Middleware: requireRole
 * ------------------------
 * Authorizes access to a route based on the user's role.
 * 
 * This middleware assumes that the request includes a header 'x-user',
 * containing a JSON string with the user's ID and role name (e.g., 'admin', 'player').
 * 
 * The middleware checks that the role exists and is part of the allowedRoles list.
 * 
 * @param {string[]} allowedRoles - An array of permitted role names for this route.
 * @returns {function} - Express middleware function
 */

const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const userHeader = req.headers['x-user'];

      // Case 1: Header is missing entirely
      if (!userHeader) {
        return res.status(401).json({ message: "Unauthorized: 'x-user' header is missing" });
      }

      let user;

      try {
        // Attempt to parse the header value (it should be a JSON string)
        user = JSON.parse(userHeader);
      } catch (err) {
        // Case 2: Header is not valid JSON
        return res.status(400).json({ message: "Invalid 'x-user' header: must be valid JSON" });
      }

      // Case 3: Missing required fields ('id' or 'role')
      if (
        typeof user !== 'object' ||
        typeof user.id !== 'number' ||
        typeof user.role !== 'string'
      ) {
        return res.status(400).json({ message: "'x-user' must include 'id' (number) and 'role' (string)" });
      }

      // Case 4: Role is not in the list of allowed roles for this route
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: `Access denied: role '${user.role}' is not authorized for this resource`
        });
      }

      // All checks passed – attach user to request
      req.user = user;
      next();

    } catch (err) {
      // Unexpected failure
      console.error("Error in requireRole middleware:", err);
      return res.status(500).json({ message: "Internal server error during role verification" });
    }
  };
};

module.exports = { requireRole };

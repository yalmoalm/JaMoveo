// server.js – Entry point for starting the HTTP server and initializing Socket.IO.

const http = require('http');
const app = require('./app');
const { setupSocketIO } = require('./sockets/socketServer'); // Separate socket logic

// Define the port to listen on
const port = process.env.PORT || 3000;

// Create the HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO with the HTTP server
setupSocketIO(server); // All socket logic goes into /sockets/socketServer.js

// Start the server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

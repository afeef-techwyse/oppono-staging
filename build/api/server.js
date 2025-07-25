const http = require("http");

// Import your Frontity production bundle:
const server = require("../build/server").default;

module.exports = async (req, res) => {
  const httpServer = http.createServer(server);
  httpServer.emit("request", req, res);
};
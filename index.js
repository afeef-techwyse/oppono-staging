const http = require("http");
const frontity = require("@frontity/core");

const server = http.createServer(frontity);
server.listen(process.env.PORT || 3000);

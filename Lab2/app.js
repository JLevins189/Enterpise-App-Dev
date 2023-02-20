const http = require("http");
const portNumber = 8081;

http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello World\n");
  })
  .listen(portNumber);

console.log(`Server running at http://127.0.0.1:${portNumber}/`);

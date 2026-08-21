import http, { IncomingMessage, ServerResponse } from 'node:http';

// Creating an HTTP Server
const server = http.createServer((_request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello, world\n');
});

const PORT = 4000;
server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default server;

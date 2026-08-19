import http, { IncomingMessage, ServerResponse } from 'node:http';

const server = http.createServer((_request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Powered-By': 'Node.js',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Set-Cookie': 'sessionid=abc123; HttpOnly'
  });
  response.end('<h1>Hello</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

export default server;

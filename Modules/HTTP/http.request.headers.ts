import http, { IncomingMessage, ServerResponse } from 'node:http';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  console.log('Request Headers: ', request.headers);

  const host = request.headers['host'];

  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end(`Host: ${host}`);
});

server.listen(3000, () => {
  console.log('Server Running at http://localhost:3000/');
});

export default server;

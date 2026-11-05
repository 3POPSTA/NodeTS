import http, { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const q = url.parse(request.url || '/', true);
  const safePath = path.normalize(q.pathname || '/index.html');
  const filename = path.join(__dirname, safePath);

  fs.readFile(filename, (error: NodeJS.ErrnoException | null, data?: Buffer) => {
    if (error || !data) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('404 Page Not Found');
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default server;

import http, { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  // Prevent path traversal by resolving the absolute path and checking boundaries
  const filePath = path.resolve(__dirname, '.' + (request.url || '/'));

  if (!filePath.startsWith(__dirname)) {
    response.statusCode = 403;
    response.end('Access denied');
    return;
  }

  fs.stat(filePath, (error: NodeJS.ErrnoException | null, stats?: fs.Stats) => {
    if (error || !stats || !stats.isFile()) {
      response.statusCode = 404;
      response.end('File not found');
      return;
    }

    response.setHeader('Content-Length', stats.size);
    response.setHeader('Content-Type', 'application/octet-stream');

    const stream = fs.createReadStream(filePath);

    stream.on('error', (err: Error) => {
      console.log('Error reading file: ', err);
      if (!response.headersSent) {
        response.statusCode = 500;
        response.end('Error reading file');
      }
    });

    stream.pipe(response);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`File server running at http://localhost:${PORT}/`);
});

export default server;

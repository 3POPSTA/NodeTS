import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';

const keyPath = path.join(__dirname, 'key.pem');
const certPath = path.join(__dirname, 'cert.pem');

// Create self-signed or fallback credentials if files do not exist
const sslOptions: https.ServerOptions = {
  key: fs.existsSync(keyPath) ? fs.readFileSync(keyPath) : undefined,
  cert: fs.existsSync(certPath) ? fs.readFileSync(certPath) : undefined,
  minVersion: 'TLSv1.2'
};

const server = https.createServer(sslOptions, (request: IncomingMessage, response: ServerResponse) => {
  if (process.env.NODE_ENV === 'production') {
    response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'SAMEORIGIN');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Content-Security-Policy', "default-src 'self'");

  const host = request.headers.host || 'localhost:3000';
  const { pathname } = new URL(request.url || '/', `https://${host}`);

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(`
      <h1>Welcome to the Secure Server</h1>
      <p>Your connection is encrypted!</p>
    `);
  } else if (pathname === '/api/status') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }, null, 2));
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('404 Not Found');
  }
});

server.on('error', (error: Error) => {
  console.log('Server error:', error);
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at https://localhost:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

export default server;

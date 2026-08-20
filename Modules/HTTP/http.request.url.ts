import http, { IncomingMessage, ServerResponse } from 'node:http';
import url from 'node:url';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const parsedUrl = url.parse(request.url || '/', true);
  console.log(parsedUrl);

  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    JSON.stringify(
      {
        pathname,
        query,
        fullUrl: request.url
      },
      null,
      2
    )
  );
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

export default server;

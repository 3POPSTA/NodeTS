import http, { IncomingMessage, ServerResponse } from 'node:http';
import { URL } from 'node:url';
import querystring from 'node:querystring';

const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
  const host = request.headers.host || 'localhost:3000';
  const baseUrl = `http://${host}/`;
  const parsedUrl = new URL(request.url || '/', baseUrl);

  const queryParameters = Object.fromEntries(parsedUrl.searchParams);
  const queryObject = {
    name: 'John Doe',
    age: 30,
    interests: ['programming', 'music']
  };

  const queryString = querystring.stringify(queryObject);
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(
    JSON.stringify(
      {
        path: parsedUrl.pathname,
        queryParameters,
        exampleQueryString: queryString
      },
      null,
      2
    )
  );
});

server.listen(3000, () => {
  console.log('Running server');
});

export default server;

import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

// app.get() - Handle GET requests
// app.post() - Handle POST requests
// app.put() - Handle PUT requests
// app.delete() - Handle DELETE requests
// app.all() - Handle all HTTP methods

// Respond to GET request on the root route
app.get('/', (request: Request, response: Response): void => {
  response.send('Homepage');
});

// Respond to POST request on the root route
app.post('/', (request: Request, response: Response): void => {
  response.send('POST request to the homepage');
});

// Respond to GET request on the /about route
app.get('/about', (request: Request, response: Response): void => {
  response.send('About Page');
});

// Catch all other routes
app.all('/{*splat}', (request: Request, response: Response): void => {
  response.status(404).send('404 - Page not found');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};

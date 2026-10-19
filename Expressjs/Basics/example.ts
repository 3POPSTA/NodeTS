import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

// Define a route for GET requests to the root URL
app.get('/', (request: Request, response: Response): void => {
  response.send('Hello world from express');
});

// start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};

import express, { Request, Response } from 'express';

const app = express();
const port = 8080;

// URL EXAMPLE: http://localhost:8080/search?q=express&category=framework

app.get('/search', (request: Request, response: Response): void => {
  const { q, category } = request.query;
  response.send(`Search query: ${q}, Category: ${category || 'none'}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};

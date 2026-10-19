import express, { Request, Response, NextFunction } from 'express';

declare function nonExistentFunction(): string;

const app = express();
const port = 8080;

app.get('/error', (request: Request, response: Response): void => {
  throw new Error('Something went wrong');
});

app.get('/async-error', (request: Request, response: Response, next: NextFunction): void => {
  setTimeout(() => {
    try {
      const result = nonExistentFunction();
      response.send(result);
    } catch (error) {
      next(error);
    }
  }, 100);
});

app.use((error: Error, request: Request, response: Response, next: NextFunction): void => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export {};

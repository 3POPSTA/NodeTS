import express, { Request, Response, NextFunction } from 'express';

const app = express();

// First Middleware
app.use((_request: Request, _response: Response, next: NextFunction) => {
  console.log('Middleware 1: This always runs');
  next();
});

// Second Middleware
app.use((_request: Request, _response: Response, next: NextFunction) => {
  console.log('Middleware 2: This also always runs');
  next();
});

// Third Middleware
app.use((_request: Request, _response: Response, next: NextFunction) => {
  console.log('Middleware 3: This also always runs');
  next();
});

// Route Handler
app.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Hello World</h1>');
});

const port = 3000;
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;

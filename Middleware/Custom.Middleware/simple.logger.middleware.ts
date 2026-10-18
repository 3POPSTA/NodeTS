import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Create a simple logger middleware
export function requestLogger(request: Request, _response: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${request.method} ${request.url}`);
  next();
}

// Use the middleware
app.use(requestLogger);

app.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Home</h1>');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;


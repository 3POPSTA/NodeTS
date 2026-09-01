import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Application Level Middleware
app.use((_request: Request, _response: Response, next: NextFunction) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

app.get('/', (_request: Request, response: Response) => {
  response.send('<h1>Homepage</h1>');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;

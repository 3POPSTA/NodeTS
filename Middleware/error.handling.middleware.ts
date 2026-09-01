import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/test-error', (_req: Request, _res: Response, next: NextFunction) => {
  next(new Error('Sample error'));
});

// Error-handling middleware (4 arguments required by Express)
app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error.stack);
  response.status(500).send('Something broke!');
});

export default app;

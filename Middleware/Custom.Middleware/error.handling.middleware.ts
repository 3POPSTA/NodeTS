import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Regular route that might throw an error
app.get('/error-demo', (_request: Request, _response: Response, next: NextFunction) => {
  try {
    throw new Error('Something went wrong');
  } catch (error) {
    next(error);
  }
});

// Error-handling middleware
app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error.stack);
  response.status(500).json({
    message: 'An error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;

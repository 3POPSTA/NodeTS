import express, { Request, Response, NextFunction, Application } from 'express';
import userRoutes from './routes/users';
import { AppError } from './utils/errorHandler';
import { errorHandler } from './middleware/errorMiddleware';

const app: Application = express();
const port = 3000;

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Handle any unmatched routes (404)
app.all('/{*splat}', (request: Request, response: Response, next: NextFunction): void => {
  next(new AppError(404, `Can't find ${request.originalUrl} on this server!`));
});

// Centralized error handling middleware (must be last)
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;
module.exports = app;

import express, { Request, Response, NextFunction } from 'express';

const app = express();
const router = express.Router();

// Router level middleware
router.use((_request: Request, _response: Response, next: NextFunction) => {
  console.log('Router specific middleware');
  next();
});

router.get('/user/:id', (request: Request, response: Response) => {
  response.send(`User profile: ${request.params.id}`);
});

app.use('/api', router);

export { app, router };

import { Router, Request, Response, NextFunction } from 'express';

const router: Router = Router();

// Middleware specific to this router
router.use((request: Request, response: Response, next: NextFunction): void => {
  console.log('Users Router Time:', Date.now());
  next();
});

// Define routes
router.get('/', (request: Request, response: Response): void => {
  response.send('User home page');
});

router.get('/:id', (request: Request, response: Response): void => {
  response.send(`User profile for ID: ${request.params.id}`);
});

export default router;
module.exports = router;

import { Router, Request, Response } from 'express';

const router: Router = Router();

// Define routes
router.get('/', (request: Request, response: Response): void => {
  response.send('Products list');
});

router.get('/:id', (request: Request, response: Response): void => {
  response.send(`Product details for ID: ${request.params.id}`);
});

export default router;
module.exports = router;

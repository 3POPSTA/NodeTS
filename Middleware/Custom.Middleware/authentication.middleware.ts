import express, { Request, Response, NextFunction } from 'express';

export interface UserAuthInfo {
  id: number;
  username: string;
}

export interface CustomAuthRequest extends Request {
  user?: UserAuthInfo;
}

const app = express();
const port = 3000;

// Authentication middleware
export function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).send('Authentication Required');
    return;
  }

  const token = authHeader.split(' ')[1];

  if (token === 'secret-token') {
    (request as CustomAuthRequest).user = { id: 123, username: 'John' };
    next();
  } else {
    response.status(403).send('Invalid Token');
  }
}

app.get('/api/protected', authenticate, (request: Request, response: Response) => {
  const customReq = request as CustomAuthRequest;
  response.json({ message: 'Protected data', user: customReq.user });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;

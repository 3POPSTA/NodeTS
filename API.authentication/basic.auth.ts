import express, { Request, Response, NextFunction } from 'express';

export interface BasicAuthUser {
  username: string;
}

export interface BasicAuthRequest extends Request {
  user?: BasicAuthUser;
}

const app = express();

// Sample user database
const users = [
  { username: 'user1', password: 'password1' }
];

// Basic authentication middleware
export const basicAuth = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  // Get Authorization header
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // If no credentials provided, request authentication
    response.setHeader('WWW-Authenticate', 'Basic realm="API Authentication"');
    response.status(401).json({ message: 'Authentication required' });
    return;
  }

  // Extract and decode credentials
  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8');
  const [username, password] = decodedCredentials.split(':');

  // Validate credentials
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    response.setHeader('WWW-Authenticate', 'Basic realm="API Authentication"');
    response.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Attach user to request
  (request as BasicAuthRequest).user = { username: user.username };

  next();
};

// Protected route
app.get('/api/data', basicAuth, (request: Request, response: Response) => {
  const userReq = request as BasicAuthRequest;
  response.json({
    message: 'Data accessed',
    user: userReq.user?.username,
    data: { example: 'Sensitive data' }
  });
});

// Start server
const PORT = 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

export interface TokenPayload {
  id: number;
  username: string;
  role: string;
}

export interface AuthenticatedUserRequest extends Request {
  user?: TokenPayload;
}

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Sample user database
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' }
];

app.post('/login', (request: Request, response: Response): void => {
  const { username, password } = request.body as { username?: string; password?: string };

  // Find user
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    response.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Create payload for JWT
  const payload: TokenPayload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  // Sign token
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  response.json({ message: 'Login successful', token });
});

// Middleware for JWT verification
export const authenticateJWT = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    response.status(401).json({ message: 'Token missing' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    (request as AuthenticatedUserRequest).user = decoded;
    next();
  } catch (_error) {
    response.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Protected route
app.get('/profile', authenticateJWT, (request: Request, response: Response) => {
  const req = request as AuthenticatedUserRequest;
  response.json({ message: 'Profile accessed', user: req.user });
});

// Role-based route
app.get('/admin', authenticateJWT, (request: Request, response: Response): void => {
  const req = request as AuthenticatedUserRequest;
  if (req.user?.role !== 'admin') {
    response.status(403).json({ message: 'Access denied: admin role required' });
    return;
  }
  response.json({ message: 'Admin panel accessed' });
});

// Start server
const PORT = 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;

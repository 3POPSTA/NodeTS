import express, { Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

declare module 'express-session' {
  interface SessionData {
    user?: {
      id: number;
      username: string;
    };
  }
}

const app = express();

// Parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// Sample user database
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password'
  }
];

// Login route
app.post('/login', (request: Request, response: Response): void => {
  const { username, password } = request.body as { username?: string; password?: string };

  // Find user
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    response.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Store user information in session (excluding password)
  request.session.user = {
    id: user.id,
    username: user.username
  };

  response.json({ message: 'Login successful', user: request.session.user });
});

// Protected route
app.get('/profile', (request: Request, response: Response): void => {
  if (!request.session.user) {
    response.status(401).json({ message: 'Unauthorized' });
    return;
  }
  response.json({ message: 'Profile accessed', user: request.session.user });
});

// Logout route
app.post('/logout', (request: Request, response: Response): void => {
  request.session.destroy((error: unknown) => {
    if (error) {
      response.status(500).json({ message: 'Logout failed' });
      return;
    }
    response.json({ message: 'Logout successful' });
  });
});

// Start server
const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`);
  });
}

export default app;

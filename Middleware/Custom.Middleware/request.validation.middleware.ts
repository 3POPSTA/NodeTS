import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface CreateUserBody {
  username?: string;
  email?: string;
  password?: string;
}

export function validateUserCreation(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const { username, email, password } = request.body as CreateUserBody;

  if (!username || username.length < 3) {
    response.status(400).json({
      error: 'Username must be at least 3 characters'
    });
    return;
  }

  if (!email || !email.includes('@')) {
    response.status(400).json({
      error: 'Valid email is required'
    });
    return;
  }

  if (!password || password.length < 6) {
    response.status(400).json({
      error: 'Password must be at least 6 characters'
    });
    return;
  }

  next();
}

app.post('/api/users', validateUserCreation, (_request: Request, response: Response) => {
  response.status(201).json({
    message: 'User created successfully'
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

export default app;

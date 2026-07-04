import express, { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
}

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const getId = (param: string | string[] | undefined): number => {
  return parseInt(Array.isArray(param) ? param[0] : (param || '0'), 10);
};

// GET - Retrieve all users
app.get('/api/users', (request: Request, response: Response): void => {
  response.json(users);
});

// GET - Retrieve a specific user
app.get('/api/users/:id', (request: Request, response: Response): void => {
  const user = users.find((u) => u.id === getId(request.params.id));
  if (!user) {
    response.status(404).json({
      message: 'User not found'
    });
    return;
  }
  response.json(user);
});

// POST - Create a new user
app.post('/api/users', (request: Request, response: Response): void => {
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser: User = {
    id: nextId,
    name: request.body.name,
    email: request.body.email
  };
  users.push(newUser);
  response.status(201).json(newUser);
});

// PUT - Update a user completely
app.put('/api/users/:id', (request: Request, response: Response): void => {
  const user = users.find((u) => u.id === getId(request.params.id));
  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  user.name = request.body.name;
  user.email = request.body.email;

  response.json(user);
});

// DELETE - Remove a user
app.delete('/api/users/:id', (request: Request, response: Response): void => {
  const userIndex = users.findIndex((u) => u.id === getId(request.params.id));
  if (userIndex === -1) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  const deletedUser = users.splice(userIndex, 1);
  response.json(deletedUser[0]);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export {};

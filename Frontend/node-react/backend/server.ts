import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api/message', (_req: Request, res: Response) => {
  res.json({ message: 'Hello from the Node.js backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

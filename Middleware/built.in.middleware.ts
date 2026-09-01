import express, { Request, Response } from 'express';

const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

app.get('/status', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

export default app;

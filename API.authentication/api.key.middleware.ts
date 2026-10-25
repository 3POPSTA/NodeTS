import express, { Request, Response, NextFunction } from 'express';

export interface ApiKeyData {
  name: string;
  permissions: string[];
}

export interface AuthenticatedApiKeyRequest extends Request {
  apiKey?: ApiKeyData;
}

const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory storage for API keys (use a database in production)
const apikeys = new Map<string, ApiKeyData>([
  ['abc123', { name: 'Mobile App', permissions: ['read:data'] }],
  ['def456', { name: 'Web Client', permissions: ['read:data', 'write:data'] }]
]);

// Helper function to generate API keys
function generateApiKey(): string {
  return [...Array(32)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}

// API key authentication middleware
export const authenticateApiKey = (
  request: AuthenticatedApiKeyRequest,
  response: Response,
  next: NextFunction
): void | Response => {
  const apiKey = (request.headers['x-api-key'] || request.query.apiKey) as string | undefined;

  if (!apiKey) {
    return response.status(401).json({
      error: 'API key is required',
      docs: 'https://your-api-docs.com/authentication'
    });
  }

  const keyData = apikeys.get(apiKey);
  if (!keyData) {
    return response.status(403).json({ error: 'Invalid API key' });
  }

  // Attach key data to request for use in route handlers
  request.apiKey = keyData;
  next();
};

// Protected route using API key
app.get('/api/data', authenticateApiKey, (request: AuthenticatedApiKeyRequest, response: Response) => {
  response.json({
    message: 'Access granted',
    client: request.apiKey?.name,
    timestamp: new Date().toISOString()
  });
});

// Route to generate a new API key (protected by admin auth in real apps)
app.post('/api/keys', (request: Request, response: Response): void => {
  const { name, permissions } = request.body as { name?: string; permissions?: string[] };
  if (!name || !Array.isArray(permissions)) {
    response.status(400).json({ error: 'name and permissions are required' });
    return;
  }
  const apiKey = generateApiKey();

  apikeys.set(apiKey, { name, permissions });
  response.status(201).json({ apiKey });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
module.exports = app;

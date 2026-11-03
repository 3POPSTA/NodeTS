import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  password: string;
  mfaSecret: string;
  mfaEnabled: boolean;
}

const app = express();
app.use(bodyParser.json());

// In-memory database (use a real database in production)
const users: User[] = [];
const JWT_SECRET = 'your-jwt-secret-key';

// Step 1: Register a user and set up MFA
app.post('/register', (request: Request, response: Response): void => {
  const { username, password } = request.body as { username?: string; password?: string };

  if (!username || !password) {
    response.status(400).json({ message: 'Username and password required' });
    return;
  }

  // Check if user already exists
  if (users.find((u) => u.username === username)) {
    response.status(400).json({ message: 'Username already exists' });
    return;
  }

  // Generate secret for TOTP
  const secret = speakeasy.generateSecret({
    name: `MyApp:${username}`
  });

  // Create user
  const newUser: User = {
    id: users.length + 1,
    username,
    password, // In production, hash passwords!
    mfaSecret: secret.base32,
    mfaEnabled: false
  };

  users.push(newUser);

  const otpUrl = secret.otpauth_url;
  if (!otpUrl) {
    response.status(500).json({ message: 'Error generating OTP URL' });
    return;
  }

  // Generate QR code for TOTP setup
  QRCode.toDataURL(otpUrl, (err: Error | null | undefined, dataUrl: string) => {
    if (err) {
      return response.status(500).json({ message: 'Error generating QR code' });
    }

    response.json({
      message: 'User registered. Please set up MFA.',
      user: {
        id: newUser.id,
        username: newUser.username
      },
      mfaSecret: secret.base32,
      qrCode: dataUrl
    });
  });
});

// Step 2: Verify and enable MFA
app.post('/verify-mfa', (request: Request, response: Response): void => {
  const { username, token } = request.body as { username?: string; token?: string };

  if (!username || !token) {
    response.status(400).json({ message: 'Username and token required' });
    return;
  }

  // Find user
  const user = users.find((u) => u.username === username);

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  // Verify token against user's secret
  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token
  });

  if (!verified) {
    response.status(400).json({ message: 'Invalid MFA token' });
    return;
  }

  // Enable MFA for user
  user.mfaEnabled = true;

  response.json({ message: 'MFA enabled successfully' });
});

// Step 3: Login with MFA
app.post('/login', (request: Request, response: Response): void => {
  const { username, password } = request.body as { username?: string; password?: string };

  // Find user
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    response.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Check if MFA is enabled
  if (user.mfaEnabled) {
    response.json({
      message: 'Password verified. MFA token required.',
      requireMFA: true,
      userId: user.id
    });
    return;
  }

  // If MFA not enabled, generate token directly
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  response.json({ message: 'Login successful', token });
});

// Step 4: Verify MFA token and complete login
app.post('/verify-login', (request: Request, response: Response): void => {
  const { userId, mfaToken } = request.body as { userId?: number; mfaToken?: string };

  if (userId === undefined || !mfaToken) {
    response.status(400).json({ message: 'userId and mfaToken required' });
    return;
  }

  // Find user
  const user = users.find((u) => u.id === userId);

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  // Verify MFA token
  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token: mfaToken
  });

  if (!verified) {
    response.status(401).json({ message: 'Invalid MFA token' });
    return;
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  response.json({ message: 'Login successful', token });
});

// Start server
const PORT = 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

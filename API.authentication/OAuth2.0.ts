import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

export interface OAuthUser {
  id: string;
  displayName: string;
  email?: string;
  provider: string;
}

const app = express();

// Configure sessions for OAuth 2.0
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth 2.0 strategy
const clientID = process.env.CLIENT_ID || 'dummy-client-id';
const clientSecret = process.env.CLIENT_SECRET || 'dummy-client-secret';

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    (
      _accessToken: string,
      _refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      const user: OAuthUser = {
        id: profile.id,
        displayName: profile.displayName,
        email: profile.emails?.[0]?.value,
        provider: 'google'
      };
      return done(null, user);
    }
  )
);

// Serialize user for session
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Simple Login page route
app.get('/login', (_req: Request, res: Response) => {
  res.send('<h1>Login Page</h1><a href="/auth/google">Login with Google</a>');
});

// Routes for Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (_req: Request, res: Response) => {
    res.redirect('/profile');
  }
);

// Middleware to check authentication
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

// Protected route
app.get('/profile', isAuthenticated, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

// Logout route
app.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: unknown) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// Start server
const PORT = 8080;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

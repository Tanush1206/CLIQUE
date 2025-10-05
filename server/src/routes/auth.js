const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { signAuthToken } = require('../utils/jwt');
const passport = require('passport');
require('../utils/passport');

const router = express.Router();

function sendToken(res, user) {
  const token = signAuthToken(user);
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('auth_token', token, {
    httpOnly: true,
    sameSite: isProd ? 'none' : 'lax',
    secure: isProd,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

// Registration disabled: users should log in with Google or existing credentials
router.all('/register', (_req, res) => {
  return res.status(405).json({ error: 'Registration disabled. Use Google login.' });
});

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().isLength({ min: 1 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Account not found. Use Google login.' });
    if (user.provider !== 'credentials') return res.status(400).json({ error: 'Use Google login' });

    const ok = await user.validatePassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    sendToken(res, user);
    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  }
);

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token', { httpOnly: true, sameSite: 'lax' });
  res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  const token = req.cookies['auth_token'] || (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(200).json({ user: null });
  try {
    const { verifyAuthToken } = require('../utils/jwt');
    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.sub).select('email name avatarUrl role');
    res.json({ user });
  } catch {
    res.status(200).json({ user: null });
  }
});

// Google OAuth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    prompt: 'consent select_account',
    includeGrantedScopes: false,
    hd: 'sst.scaler.com',
  })
);

router.get(
  '/google/callback',
  (req, res, next) => {
    const base = process.env.NODE_ENV === 'production'
      ? 'https://clique-sst.netlify.app'
      : (process.env.CLIENT_ORIGIN || 'http://localhost:3001');
    const redirectBase = base.replace(/\/$/, '');
    
    // Configure a client-side failure redirect to avoid hitting the API domain for /login
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${redirectBase}/login?error=oauth`,
    })(req, res, next);
  },
  (req, res) => {
    sendToken(res, req.user);
    const base = process.env.NODE_ENV === 'production'
      ? 'https://clique-sst.netlify.app'
      : (process.env.CLIENT_ORIGIN || 'http://localhost:3001');
    const redirectBase = base.replace(/\/$/, '');
    
    // allow client to suggest a post-login path on the same origin
    const from = (req.query.from && String(req.query.from)) || '/';
    const safePath = from.startsWith('/') ? from : '/';
    res.redirect(`${redirectBase}${safePath}`);
  }
);

module.exports = router;



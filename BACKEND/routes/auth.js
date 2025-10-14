import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @route   GET /api/auth/google
// @desc    Initiate Google OAuth
// @access  Public
router.get(
  '/google',
  authLimiter,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// @route   GET /api/auth/google/callback
// @desc    Google OAuth callback
// @access  Public
router.get(
  '/google/callback',
  authLimiter,
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        console.error('OAuth error:', err);
        return res.redirect(`${process.env.CLIENT_ORIGIN}/login?error=server_error`);
      }

      if (!user) {
        // User authentication failed (e.g., wrong email domain)
        return res.redirect(`${process.env.CLIENT_ORIGIN}/login?error=invalid_domain`);
      }

      // Generate JWT token
      const token = generateToken(user._id);

      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_ORIGIN}/auth/success?token=${token}`);
    })(req, res, next);
  }
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        picture: req.user.picture,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', protect, (req, res) => {
  res.json({ success: true, valid: true });
});

export default router;

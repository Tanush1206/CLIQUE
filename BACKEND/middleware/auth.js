import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-__v');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please login first.',
    });
  }

  if (req.user.role !== 'admin') {
    console.log(`🚫 Access denied for user: ${req.user.email} (role: ${req.user.role || 'undefined'})`);
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
      userRole: req.user.role || 'undefined',
    });
  }

  console.log(`✅ Admin access granted: ${req.user.email}`);
  next();
};

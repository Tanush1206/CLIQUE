const { verifyAuthToken } = require('../utils/jwt');

function authGuard(req, res, next) {
  const token = req.cookies['auth_token'] || (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = verifyAuthToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = { authGuard };



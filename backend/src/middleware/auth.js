const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Authentication failed: No token provided', { ip: req.ip, path: req.path });
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      logger.warn('Authentication failed: Invalid token', { 
        error: err.message, 
        ip: req.ip, 
        path: req.path 
      });
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    logger.info('User authenticated successfully', { userId: user.id, email: user.email });
    next();
  });
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      logger.warn('Authorization failed: No user in request', { ip: req.ip, path: req.path });
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Authorization failed: Insufficient permissions', {
        userId: req.user.id,
        requiredRole: roles,
        userRole: req.user.role,
        ip: req.ip,
        path: req.path
      });
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    logger.info('Authorization successful', { userId: req.user.id, role: req.user.role, path: req.path });
    next();
  };
};

const requireSuperAdmin = (req, res, next) => {
  if (!req.user) {
    logger.warn('SuperAdmin check failed: No user in request', { ip: req.ip, path: req.path });
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.role !== 'SuperAdmin') {
    logger.warn('SuperAdmin check failed: Not a SuperAdmin', {
      userId: req.user.id,
      userRole: req.user.role,
      ip: req.ip,
      path: req.path
    });
    return res.status(403).json({ error: 'SuperAdmin access required' });
  }

  logger.info('SuperAdmin authorization successful', { userId: req.user.id, path: req.path });
  next();
};

module.exports = { authenticateToken, requireRole, requireSuperAdmin };

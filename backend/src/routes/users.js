const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken, requireRole } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all users (admin only)
router.get('/', authenticateToken, requireRole(['Admin', 'SuperAdmin']), async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT UserID, Username, Email, UserType, OrganizationID, IsActive, CreatedAt, UpdatedAt FROM Users'
    );
    res.json(users);
  } catch (error) {
    logger.error('Database error fetching users:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT UserID, Username, Email, UserType, OrganizationID, IsActive, CreatedAt, UpdatedAt FROM Users WHERE UserID = @id',
      { id: req.params.id }
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (error) {
    logger.error('Database error fetching user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { username, email, userType, organizationId } = req.body;
    
    await executeNonQuery(
      `UPDATE Users SET Username = @username, Email = @email, UserType = @userType, OrganizationID = @orgId, UpdatedAt = SYSUTCDATETIME() 
       WHERE UserID = @id`,
      {
        username,
        email,
        userType,
        orgId: organizationId,
        id: req.params.id
      }
    );

    logger.info('User updated:', { userId: req.params.id });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    logger.error('Database error updating user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticateToken, requireRole(['Admin', 'SuperAdmin']), async (req, res) => {
  try {
    await executeNonQuery(
      'UPDATE Users SET IsActive = 0 WHERE UserID = @id',
      { id: req.params.id }
    );

    logger.info('User deleted:', { userId: req.params.id });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('Database error deleting user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

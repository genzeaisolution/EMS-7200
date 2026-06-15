const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { executeQuery, executeNonQuery, executeScalar } = require('../database/mssql-config');
const logger = require('../utils/logger');

// Register
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('password').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Registration validation failed:', { errors: errors.array() });
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, organizationId } = req.body;
    logger.info('Registration attempt:', { email, firstName, lastName });

    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT UserID FROM Users WHERE Email = @email',
      { email }
    );

    if (existingUser.length > 0) {
      logger.warn('Registration attempt with existing email:', { email });
      return res.status(400).json({ error: 'User already exists' });
    }

    // Get or use organization ID
    let orgId = organizationId;
    if (!orgId) {
      // Get the first/default organization
      const org = await executeQuery(
        'SELECT TOP 1 OrganizationID FROM Organizations WHERE IsActive = 1 ORDER BY CreatedAt'
      );
      if (org.length === 0) {
        logger.error('No organization found for registration');
        return res.status(400).json({ error: 'No organization available. Please create an organization first.' });
      }
      orgId = org[0].OrganizationID;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordSalt = bcrypt.genSaltSync(10);

    // Insert user (using OUTPUT to get the generated GUID)
    const result = await executeNonQuery(
      `INSERT INTO Users (UserID, OrganizationID, Username, Email, PasswordHash, PasswordSalt, UserType, IsActive, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.UserID
       VALUES (NEWID(), @orgId, @username, @email, @password, @salt, 'Employee', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        orgId,
        username: email.split('@')[0],
        email,
        password: hashedPassword,
        salt: passwordSalt
      }
    );

    const newUserId = result && result.recordset && result.recordset[0] ? result.recordset[0].UserID : null;

    logger.info('User registered successfully:', { userId: newUserId, email });
    res.status(201).json({ 
      message: 'User registered successfully',
      userId: newUserId
    });
  } catch (error) {
    logger.error('Registration error:', { error: error.message, stack: error.stack });
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const users = await executeQuery(
      'SELECT * FROM Users WHERE Email = @email AND IsActive = 1',
      { email }
    );

    if (users.length === 0) {
      logger.warn('Login attempt with non-existent email:', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.PasswordHash);
    
    if (!validPassword) {
      logger.warn('Login attempt with invalid password:', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.UserID, 
        email: user.Email, 
        role: user.UserType,
        organizationId: user.OrganizationID 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    logger.info('User logged in successfully:', { userId: user.UserID, email });

    res.json({
      token,
      user: {
        id: user.UserID,
        email: user.Email,
        username: user.Username,
        firstName: '', // New schema doesn't have first/last name separate
        lastName: '',
        role: user.UserType,
        organizationId: user.OrganizationID,
        avatar: null
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
router.get('/me', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT UserID, Email, Username, UserType, OrganizationID, IsActive, CreatedAt, UpdatedAt FROM Users WHERE UserID = @id',
      { id: req.user.id }
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    res.json({
      id: user.UserID,
      email: user.Email,
      username: user.Username,
      firstName: '', // New schema uses Username instead of first/last name
      lastName: '',
      role: user.UserType,
      organizationId: user.OrganizationID,
      avatar: null,
      createdAt: user.CreatedAt
    });
  } catch (error) {
    logger.error('Error fetching user:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

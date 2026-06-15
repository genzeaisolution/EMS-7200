const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get user settings
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const settings = await executeQuery(
      'SELECT Key, Value FROM UserSettings WHERE UserID = @userId',
      { userId: req.params.userId }
    );

    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.Key] = setting.Value;
    });

    res.json(settingsObj);
  } catch (error) {
    logger.error('Database error fetching user settings:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get organization settings
router.get('/organization/:orgId', authenticateToken, async (req, res) => {
  try {
    const settings = await executeQuery(
      'SELECT Key, Value FROM OrganizationSettings WHERE OrganizationID = @orgId',
      { orgId: req.params.orgId }
    );

    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.Key] = setting.Value;
    });

    res.json(settingsObj);
  } catch (error) {
    logger.error('Database error fetching organization settings:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update user setting
router.put('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const { key, value } = req.body;
    
    await executeNonQuery(
      `IF EXISTS (SELECT * FROM UserSettings WHERE UserID = @userId AND Key = @key)
         UPDATE UserSettings SET Value = @value, UpdatedAt = SYSUTCDATETIME() WHERE UserID = @userId AND Key = @key
       ELSE
         INSERT INTO UserSettings (SettingID, UserID, Key, Value, CreatedAt, UpdatedAt) VALUES (NEWID(), @userId, @key, @value, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        userId: req.params.userId,
        key,
        value
      }
    );

    logger.info('User setting updated:', { userId: req.params.userId, key });
    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    logger.error('Database error updating user setting:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update organization setting
router.put('/organization/:orgId', authenticateToken, async (req, res) => {
  try {
    const { key, value } = req.body;
    
    await executeNonQuery(
      `IF EXISTS (SELECT * FROM OrganizationSettings WHERE OrganizationID = @orgId AND Key = @key)
         UPDATE OrganizationSettings SET Value = @value, UpdatedAt = SYSUTCDATETIME() WHERE OrganizationID = @orgId AND Key = @key
       ELSE
         INSERT INTO OrganizationSettings (SettingID, OrganizationID, Key, Value, CreatedAt, UpdatedAt) VALUES (NEWID(), @orgId, @key, @value, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        orgId: req.params.orgId,
        key,
        value
      }
    );

    logger.info('Organization setting updated:', { orgId: req.params.orgId, key });
    res.json({ message: 'Setting updated successfully' });
  } catch (error) {
    logger.error('Database error updating organization setting:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

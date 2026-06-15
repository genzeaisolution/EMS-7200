const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken, requireRole } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all organizations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const organizations = await executeQuery(
      'SELECT * FROM Organizations WHERE IsActive = 1'
    );
    res.json(organizations);
  } catch (error) {
    logger.error('Database error fetching organizations:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get organization by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const organizations = await executeQuery(
      'SELECT * FROM Organizations WHERE OrganizationID = @id',
      { id: req.params.id }
    );

    if (organizations.length === 0) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organizations[0]);
  } catch (error) {
    logger.error('Database error fetching organization:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create organization
router.post('/', authenticateToken, requireRole(['Admin', 'SuperAdmin']), async (req, res) => {
  try {
    const { name, slug, description, logo } = req.body;
    
    const result = await executeNonQuery(
      `INSERT INTO Organizations (OrganizationID, Name, Slug, Description, LogoURL, IsActive, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.OrganizationID
       VALUES (NEWID(), @name, @slug, @description, @logo, 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      { name, slug, description, logo }
    );

    const newOrgId = result && result.recordset && result.recordset[0] ? result.recordset[0].OrganizationID : null;
    
    logger.info('Organization created:', { orgId: newOrgId, name });
    res.status(201).json({ id: newOrgId, name, slug, description, logo });
  } catch (error) {
    logger.error('Database error creating organization:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update organization
router.put('/:id', authenticateToken, requireRole(['Admin', 'SuperAdmin']), async (req, res) => {
  try {
    const { name, description, logo } = req.body;
    
    await executeNonQuery(
      'UPDATE Organizations SET Name = @name, Description = @description, LogoURL = @logo, UpdatedAt = SYSUTCDATETIME() WHERE OrganizationID = @id',
      {
        name,
        description,
        logo,
        id: req.params.id
      }
    );

    logger.info('Organization updated:', { orgId: req.params.id });
    res.json({ message: 'Organization updated successfully' });
  } catch (error) {
    logger.error('Database error updating organization:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all agents
router.get('/', authenticateToken, async (req, res) => {
  try {
    const agents = await executeQuery(
      "SELECT * FROM Agents WHERE Status = 'Active'"
    );
    res.json(agents);
  } catch (error) {
    logger.error('Database error fetching agents:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get agent by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const agents = await executeQuery(
      'SELECT * FROM Agents WHERE AgentID = @id',
      { id: req.params.id }
    );

    if (agents.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }

    res.json(agents[0]);
  } catch (error) {
    logger.error('Database error fetching agent:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create agent
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, type, description, config, organizationId, branchId, userId } = req.body;
    
    const result = await executeNonQuery(
      `INSERT INTO Agents (AgentID, UserID, OrganizationID, BranchID, AgentCode, AgentName, AgentType, Description, Status, IsActive, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.AgentID
       VALUES (NEWID(), @userId, @orgId, @branchId, @code, @name, @type, @description, 'Active', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        userId: userId || null,
        orgId: organizationId || null,
        branchId: branchId || null,
        code: `AGENT-${Date.now()}`,
        name,
        type: type || 'SalesAgent',
        description,
        createdBy: req.user.id
      }
    );

    const newAgentId = result && result.recordset && result.recordset[0] ? result.recordset[0].AgentID : null;
    
    logger.info('Agent created:', { agentId: newAgentId });
    res.status(201).json({ id: newAgentId, name, type, description });
  } catch (error) {
    logger.error('Database error creating agent:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update agent
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, status } = req.body;
    
    await executeNonQuery(
      'UPDATE Agents SET AgentName = @name, Description = @description, Status = @status, UpdatedAt = SYSUTCDATETIME() WHERE AgentID = @id',
      {
        name,
        description,
        status,
        id: req.params.id
      }
    );

    logger.info('Agent updated:', { agentId: req.params.id });
    res.json({ message: 'Agent updated successfully' });
  } catch (error) {
    logger.error('Database error updating agent:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

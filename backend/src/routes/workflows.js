const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all workflows
router.get('/', authenticateToken, async (req, res) => {
  try {
    const workflows = await executeQuery(
      "SELECT * FROM Workflows WHERE IsActive = 1"
    );
    res.json(workflows);
  } catch (error) {
    logger.error('Database error fetching workflows:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get workflow by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const workflows = await executeQuery(
      'SELECT * FROM Workflows WHERE WorkflowID = @id',
      { id: req.params.id }
    );

    if (workflows.length === 0) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    res.json(workflows[0]);
  } catch (error) {
    logger.error('Database error fetching workflow:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create workflow
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, definition } = req.body;
    
    await executeNonQuery(
      'INSERT INTO workflows (name, description, definition, created_by) VALUES (@name, @description, @definition, @createdBy)',
      {
        name,
        description,
        definition: JSON.stringify(definition),
        createdBy: req.user.id
      }
    );

    const newId = await executeQuery('SELECT SCOPE_IDENTITY() as id');
    
    logger.info('Workflow created:', { workflowId: newId[0].id });
    res.status(201).json({ id: newId[0].id, name, description });
  } catch (error) {
    logger.error('Database error creating workflow:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update workflow
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, isActive, triggerType } = req.body;
    
    await executeNonQuery(
      'UPDATE Workflows SET Name = @name, Description = @description, IsActive = @isActive, TriggerType = @triggerType, UpdatedAt = SYSUTCDATETIME() WHERE WorkflowID = @id',
      {
        name,
        description,
        isActive: isActive !== undefined ? isActive : 1,
        triggerType,
        id: req.params.id
      }
    );

    logger.info('Workflow updated:', { workflowId: req.params.id });
    res.json({ message: 'Workflow updated successfully' });
  } catch (error) {
    logger.error('Database error updating workflow:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

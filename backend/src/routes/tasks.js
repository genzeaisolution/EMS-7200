const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, assignedTo } = req.query;
    let query = 'SELECT * FROM Tasks';
    let params = {};
    let conditions = [];
    
    if (status) {
      conditions.push('StatusID = @status');
      params.status = status;
    }
    if (assignedTo) {
      conditions.push('AssignedToUserID = @assignedTo');
      params.assignedTo = assignedTo;
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    const tasks = await executeQuery(query, params);
    res.json(tasks);
  } catch (error) {
    logger.error('Database error fetching tasks:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get task by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const tasks = await executeQuery(
      'SELECT * FROM Tasks WHERE TaskID = @id',
      { id: req.params.id }
    );

    if (tasks.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(tasks[0]);
  } catch (error) {
    logger.error('Database error fetching task:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, organizationId } = req.body;
    
    const result = await executeNonQuery(
      `INSERT INTO Tasks (TaskID, OrganizationID, Title, Description, StatusID, PriorityID, AssignedToUserID, CreatedBy, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.TaskID
       VALUES (NEWID(), @orgId, @title, @description, @status, @priority, @assignedTo, @createdBy, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        orgId: organizationId || null,
        title,
        description,
        status: status || null,
        priority: priority || null,
        assignedTo: assignedTo || null,
        createdBy: req.user.id
      }
    );

    const newTaskId = result && result.recordset && result.recordset[0] ? result.recordset[0].TaskID : null;
    
    logger.info('Task created:', { taskId: newTaskId });
    res.status(201).json({ id: newTaskId, title, status });
  } catch (error) {
    logger.error('Database error creating task:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, completedAt } = req.body;
    
    await executeNonQuery(
      'UPDATE Tasks SET Title = @title, Description = @description, StatusID = @status, PriorityID = @priority, AssignedToUserID = @assignedTo, UpdatedAt = SYSUTCDATETIME() WHERE TaskID = @id',
      {
        title,
        description,
        status,
        priority,
        assignedTo: assignedTo || null,
        id: req.params.id
      }
    );

    logger.info('Task updated:', { taskId: req.params.id });
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    logger.error('Database error updating task:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await executeNonQuery(
      'DELETE FROM Tasks WHERE TaskID = @id',
      { id: req.params.id }
    );

    logger.info('Task deleted:', { taskId: req.params.id });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    logger.error('Database error deleting task:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

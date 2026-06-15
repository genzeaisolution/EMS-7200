const express = require('express');
const router = express.Router();
const { executeQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get dashboard statistics
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const queries = [
      'SELECT COUNT(*) as count FROM Users WHERE IsActive = 1',
      'SELECT COUNT(*) as count FROM Organizations WHERE IsActive = 1',
      'SELECT COUNT(*) as count FROM Tasks WHERE StatusID NOT IN (SELECT StatusID FROM TaskStatus WHERE Name = "Completed")',
      'SELECT COUNT(*) as count FROM Tickets WHERE StatusID NOT IN (SELECT StatusID FROM TicketStatus WHERE Name = "Resolved")',
      'SELECT COUNT(*) as count FROM Agents WHERE Status = "Active"'
    ];

    const results = await Promise.all(queries.map(query => executeQuery(query)));
    
    res.json({
      users: results[0][0].count,
      organizations: results[1][0].count,
      pendingTasks: results[2][0].count,
      openTickets: results[3][0].count,
      activeAgents: results[4][0].count
    });
  } catch (error) {
    logger.error('Database error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get task report
router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    const results = await executeQuery(`
      SELECT StatusID, COUNT(*) as count 
      FROM Tasks 
      WHERE IsDeleted = 0
      GROUP BY StatusID
    `);
    res.json(results);
  } catch (error) {
    logger.error('Database error fetching task report:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get ticket report
router.get('/tickets', authenticateToken, async (req, res) => {
  try {
    const results = await executeQuery(`
      SELECT StatusID, COUNT(*) as count 
      FROM Tickets 
      GROUP BY StatusID
    `);
    res.json(results);
  } catch (error) {
    logger.error('Database error fetching ticket report:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get employee report
router.get('/employees', authenticateToken, async (req, res) => {
  try {
    const results = await executeQuery(`
      SELECT DepartmentID, COUNT(*) as count 
      FROM Employees 
      WHERE EmploymentStatus = 'Active' AND IsDeleted = 0
      GROUP BY DepartmentID
    `);
    res.json(results);
  } catch (error) {
    logger.error('Database error fetching employee report:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

// Get all tickets
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, organizationId } = req.query;
    let query = 'SELECT * FROM Tickets';
    let params = {};
    let conditions = [];
    
    if (status) {
      conditions.push('StatusID = @status');
      params.status = status;
    }
    if (organizationId) {
      conditions.push('OrganizationID = @organizationId');
      params.organizationId = organizationId;
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    const tickets = await executeQuery(query, params);
    res.json(tickets);
  } catch (error) {
    logger.error('Database error fetching tickets:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get ticket by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const tickets = await executeQuery(
      'SELECT * FROM Tickets WHERE TicketID = @id',
      { id: req.params.id }
    );

    if (tickets.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(tickets[0]);
  } catch (error) {
    logger.error('Database error fetching ticket:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create ticket
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority, category, organizationId } = req.body;
    const ticketNumber = `TKT-${uuidv4().slice(0, 8).toUpperCase()}`;
    
    const result = await executeNonQuery(
      `INSERT INTO Tickets (TicketID, OrganizationID, TicketNumber, Title, Description, StatusID, CategoryID, Priority, RequesterID, CreatedBy, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.TicketID
       VALUES (NEWID(), @orgId, @ticketNumber, @title, @description, @status, @category, @priority, @requesterId, @createdBy, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        orgId: organizationId || null,
        ticketNumber,
        title,
        description,
        status: status || null,
        category: category || null,
        priority: priority || 'Medium',
        requesterId: req.user.id,
        createdBy: req.user.id
      }
    );

    const newTicketId = result && result.recordset && result.recordset[0] ? result.recordset[0].TicketID : null;
    
    logger.info('Ticket created:', { ticketId: newTicketId, ticketNumber });
    res.status(201).json({ id: newTicketId, ticketNumber, title, status });
  } catch (error) {
    logger.error('Database error creating ticket:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update ticket
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, resolvedAt, resolution } = req.body;
    
    await executeNonQuery(
      'UPDATE Tickets SET Title = @title, Description = @description, StatusID = @status, Priority = @priority, UpdatedAt = SYSUTCDATETIME() WHERE TicketID = @id',
      {
        title,
        description,
        status,
        priority,
        id: req.params.id
      }
    );

    logger.info('Ticket updated:', { ticketId: req.params.id });
    res.json({ message: 'Ticket updated successfully' });
  } catch (error) {
    logger.error('Database error updating ticket:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

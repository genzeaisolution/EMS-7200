const express = require('express');
const router = express.Router();
const { executeQuery, executeNonQuery } = require('../database/mssql-config');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all employees
router.get('/', authenticateToken, async (req, res) => {
  try {
    const employees = await executeQuery(`
      SELECT e.*, u.Email, u.Username 
      FROM Employees e 
      JOIN Users u ON e.UserID = u.UserID
    `);
    res.json(employees);
  } catch (error) {
    logger.error('Database error fetching employees:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get employee by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const employees = await executeQuery(`
      SELECT e.*, u.Email, u.Username 
      FROM Employees e 
      JOIN Users u ON e.UserID = u.UserID 
      WHERE e.EmployeeID = @id
    `, { id: req.params.id });

    if (employees.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employees[0]);
  } catch (error) {
    logger.error('Database error fetching employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create employee
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { userId, employeeCode, departmentId, branchId, organizationId, employmentType, employmentStatus, joinDate } = req.body;
    
    const result = await executeNonQuery(
      `INSERT INTO Employees (EmployeeID, UserID, OrganizationID, BranchID, DepartmentID, EmployeeCode, EmploymentType, EmploymentStatus, JoinDate, IsActive, CreatedAt, UpdatedAt) 
       OUTPUT INSERTED.EmployeeID
       VALUES (NEWID(), @userId, @orgId, @branchId, @deptId, @code, @type, @status, @joinDate, 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        userId,
        orgId: organizationId || null,
        branchId: branchId || null,
        deptId: departmentId || null,
        code: employeeCode,
        type: employmentType || 'FullTime',
        status: employmentStatus || 'Active',
        joinDate: joinDate || null
      }
    );

    const newEmployeeId = result && result.recordset && result.recordset[0] ? result.recordset[0].EmployeeID : null;
    
    logger.info('Employee created:', { employeeId: newEmployeeId });
    res.status(201).json({ id: newEmployeeId, userId, employeeCode, employmentType, employmentStatus });
  } catch (error) {
    logger.error('Database error creating employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update employee
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { departmentId, employmentType, employmentStatus, joinDate } = req.body;
    
    await executeNonQuery(
      'UPDATE Employees SET DepartmentID = @deptId, EmploymentType = @type, EmploymentStatus = @status, JoinDate = @joinDate, UpdatedAt = SYSUTCDATETIME() WHERE EmployeeID = @id',
      {
        deptId: departmentId,
        type: employmentType,
        status: employmentStatus,
        joinDate,
        id: req.params.id
      }
    );

    logger.info('Employee updated:', { employeeId: req.params.id });
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    logger.error('Database error updating employee:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;

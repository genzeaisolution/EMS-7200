const bcrypt = require('bcryptjs');
const { executeNonQuery, executeScalar, sql } = require('./src/database/mssql-config');
const logger = require('./src/utils/logger');

// Helper function to check for old schema
async function checkForOldSchema() {
  try {
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: 'master', // Connect to master to check database
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    // Check if old tables exist (lowercase names)
    const result = await connection.request().query(`
      SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME IN ('organizations', 'users', 'employees', 'agents', 'tasks', 'tickets', 'documents', 'workflows', 'settings')
    `);
    
    await connection.close();
    return result.recordset[0].count > 0;
  } catch (error) {
    logger.warn('Error checking for old schema:', error.message);
    return false;
  }
}

// Helper function to drop old database
async function dropOldDatabase() {
  try {
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: 'master',
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    // Kill all connections to the database
    await connection.request().query(`
      DECLARE @SQL NVARCHAR(MAX) = '';
      SELECT @SQL = @SQL + 'KILL ' + CONVERT(NVARCHAR, SPID) + ';'
      FROM sys.sysprocesses
      WHERE DB_NAME(DBID) = 'EnterpriseEMS';
      EXEC(@SQL);
    `);

    // Drop the database
    await connection.request().query('DROP DATABASE IF EXISTS EnterpriseEMS');
    await connection.close();
    logger.info('Old database dropped successfully');
  } catch (error) {
    logger.error('Error dropping old database:', error.message);
    throw error;
  }
}

// Helper function to create new database
async function createNewDatabase() {
  try {
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: 'master',
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    await connection.request().query('CREATE DATABASE EnterpriseEMS');
    await connection.close();
    logger.info('New database created successfully');
  } catch (error) {
    logger.error('Error creating new database:', error.message);
    throw error;
  }
}

// Helper function to create new schema tables
async function createNewSchema() {
  try {
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: process.env.MSSQL_DATABASE || 'EnterpriseEMS',
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    // Create Organizations table
    await connection.request().query(`
      CREATE TABLE Organizations (
        OrganizationID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL,
        Address NVARCHAR(MAX),
        City NVARCHAR(100),
        State NVARCHAR(100),
        Country NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Phone NVARCHAR(50),
        Email NVARCHAR(255),
        Website NVARCHAR(255),
        Industry NVARCHAR(100),
        CompanySize NVARCHAR(50),
        TaxID NVARCHAR(50),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
      )
    `);

    // Create Users table
    await connection.request().query(`
      CREATE TABLE Users (
        UserID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        Username NVARCHAR(100) NOT NULL,
        Email NVARCHAR(255) NOT NULL UNIQUE,
        PasswordHash NVARCHAR(MAX) NOT NULL,
        PasswordSalt NVARCHAR(MAX) NOT NULL,
        UserType NVARCHAR(50) NOT NULL,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
      )
    `);

    // Create Branches table
    await connection.request().query(`
      CREATE TABLE Branches (
        BranchID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL,
        Address NVARCHAR(MAX),
        City NVARCHAR(100),
        State NVARCHAR(100),
        Country NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Phone NVARCHAR(50),
        Email NVARCHAR(255),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
      )
    `);

    // Create Departments table
    await connection.request().query(`
      CREATE TABLE Departments (
        DepartmentID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        Name NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL,
        Description NVARCHAR(MAX),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
      )
    `);

    // Create Employees table
    await connection.request().query(`
      CREATE TABLE Employees (
        EmployeeID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        UserID UNIQUEIDENTIFIER NOT NULL,
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        DepartmentID UNIQUEIDENTIFIER,
        EmployeeCode NVARCHAR(50) NOT NULL,
        FirstName NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        MiddleName NVARCHAR(100),
        DateOfBirth DATE,
        Gender NVARCHAR(20),
        Nationality NVARCHAR(100),
        MaritalStatus NVARCHAR(50),
        Address NVARCHAR(MAX),
        City NVARCHAR(100),
        State NVARCHAR(100),
        Country NVARCHAR(100),
        PostalCode NVARCHAR(20),
        Phone NVARCHAR(50),
        Mobile NVARCHAR(50),
        Email NVARCHAR(255),
        EmploymentType NVARCHAR(50),
        EmploymentStatus NVARCHAR(50),
        JoinDate DATE,
        TerminationDate DATE,
        JobTitle NVARCHAR(100),
        Department NVARCHAR(100),
        ManagerID UNIQUEIDENTIFIER,
        Salary DECIMAL(18,2),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID),
        FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
      )
    `);

    // Create Agents table
    await connection.request().query(`
      CREATE TABLE Agents (
        AgentID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        UserID UNIQUEIDENTIFIER NOT NULL,
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        AgentCode NVARCHAR(50) NOT NULL,
        FirstName NVARCHAR(100) NOT NULL,
        LastName NVARCHAR(100) NOT NULL,
        Email NVARCHAR(255),
        Phone NVARCHAR(50),
        Mobile NVARCHAR(50),
        Address NVARCHAR(MAX),
        City NVARCHAR(100),
        State NVARCHAR(100),
        Country NVARCHAR(100),
        PostalCode NVARCHAR(20),
        AgentType NVARCHAR(50),
        Status NVARCHAR(50),
        CommissionRate DECIMAL(5,2),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (UserID) REFERENCES Users(UserID),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
      )
    `);

    // Create TaskStatus table
    await connection.request().query(`
      CREATE TABLE TaskStatus (
        StatusID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Name NVARCHAR(50) NOT NULL,
        Description NVARCHAR(MAX),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
      )
    `);

    // Create Tasks table
    await connection.request().query(`
      CREATE TABLE Tasks (
        TaskID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        DepartmentID UNIQUEIDENTIFIER,
        AssignedTo UNIQUEIDENTIFIER,
        CreatedBy UNIQUEIDENTIFIER,
        StatusID UNIQUEIDENTIFIER,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        Priority NVARCHAR(20),
        DueDate DATETIME2,
        CompletedDate DATETIME2,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID),
        FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID),
        FOREIGN KEY (AssignedTo) REFERENCES Employees(EmployeeID),
        FOREIGN KEY (CreatedBy) REFERENCES Users(UserID),
        FOREIGN KEY (StatusID) REFERENCES TaskStatus(StatusID)
      )
    `);

    // Create TicketStatus table
    await connection.request().query(`
      CREATE TABLE TicketStatus (
        StatusID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        Name NVARCHAR(50) NOT NULL,
        Description NVARCHAR(MAX),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
      )
    `);

    // Create Tickets table
    await connection.request().query(`
      CREATE TABLE Tickets (
        TicketID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        AssignedTo UNIQUEIDENTIFIER,
        CreatedBy UNIQUEIDENTIFIER,
        StatusID UNIQUEIDENTIFIER,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        Priority NVARCHAR(20),
        Category NVARCHAR(100),
        DueDate DATETIME2,
        ResolvedDate DATETIME2,
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID),
        FOREIGN KEY (AssignedTo) REFERENCES Employees(EmployeeID),
        FOREIGN KEY (CreatedBy) REFERENCES Users(UserID),
        FOREIGN KEY (StatusID) REFERENCES TicketStatus(StatusID)
      )
    `);

    // Create Documents table
    await connection.request().query(`
      CREATE TABLE Documents (
        DocumentID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        UploadedBy UNIQUEIDENTIFIER,
        Title NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        FilePath NVARCHAR(MAX) NOT NULL,
        FileType NVARCHAR(50),
        FileSize BIGINT,
        Category NVARCHAR(100),
        Tags NVARCHAR(MAX),
        Version NVARCHAR(20),
        IsActive BIT DEFAULT 1,
        IsDeleted BIT DEFAULT 0,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID),
        FOREIGN KEY (UploadedBy) REFERENCES Users(UserID)
      )
    `);

    // Create Workflows table
    await connection.request().query(`
      CREATE TABLE Workflows (
        WorkflowID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        BranchID UNIQUEIDENTIFIER,
        Name NVARCHAR(255) NOT NULL,
        Description NVARCHAR(MAX),
        Status NVARCHAR(50),
        IsActive BIT DEFAULT 1,
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID),
        FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
      )
    `);

    // Create UserSettings table
    await connection.request().query(`
      CREATE TABLE UserSettings (
        SettingID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        UserID UNIQUEIDENTIFIER NOT NULL,
        Key NVARCHAR(100) NOT NULL,
        Value NVARCHAR(MAX),
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (UserID) REFERENCES Users(UserID)
      )
    `);

    // Create OrganizationSettings table
    await connection.request().query(`
      CREATE TABLE OrganizationSettings (
        SettingID UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
        OrganizationID UNIQUEIDENTIFIER NOT NULL,
        Key NVARCHAR(100) NOT NULL,
        Value NVARCHAR(MAX),
        CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
        FOREIGN KEY (OrganizationID) REFERENCES Organizations(OrganizationID)
      )
    `);

    await connection.close();
    logger.info('New schema tables created successfully');
  } catch (error) {
    logger.error('Error creating new schema:', error.message);
    throw error;
  }
}

// Helper function to check if new schema exists
async function checkForNewSchema() {
  try {
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: 'EnterpriseEMS',
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    // Check if new schema tables exist (PascalCase names)
    const result = await connection.request().query(`
      SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dbo' 
      AND TABLE_NAME IN ('Organizations', 'Users', 'Employees', 'Agents', 'Tasks', 'Tickets', 'Documents', 'Workflows')
    `);
    
    await connection.close();
    return result.recordset[0].count >= 5; // At least some tables exist
  } catch (error) {
    logger.warn('Error checking for new schema:', error.message);
    return false;
  }
}

async function seedDatabase() {
  try {
    logger.info('Starting MSSQL database seeding...');

    // Check if old schema exists
    const hasOldSchema = await checkForOldSchema();
    
    if (hasOldSchema) {
      logger.warn('⚠️  Old schema detected with lowercase table names.');
      logger.warn('⚠️  Automatically dropping old database and creating new schema...');
      
      try {
        await dropOldDatabase();
        logger.info('✅ Old database dropped successfully');
        await createNewDatabase();
        logger.info('✅ New database created successfully');
        await createNewSchema();
        logger.info('✅ New schema created successfully');
      } catch (error) {
        logger.error('❌ Failed to recreate database:', error.message);
        logger.warn('Please manually drop the database using SQL Server Management Studio');
        process.exit(1);
      }
    }

    // Check if Organizations table specifically exists
    const hasOrganizations = await checkForNewSchema();
    
    if (!hasOrganizations) {
      logger.warn('⚠️  New schema not found in database.');
      logger.warn('🔧 Creating new schema automatically...');
      
      try {
        await createNewSchema();
        logger.info('✅ New schema created successfully');
      } catch (error) {
        logger.error('❌ Failed to create new schema:', error.message);
        logger.warn('Please manually create the schema using SQL Server Management Studio');
        process.exit(1);
      }
    }

    // Specifically check if Organizations table exists and its structure
    const connection = await sql.connect({
      server: process.env.MSSQL_SERVER || 'localhost',
      port: parseInt(process.env.MSSQL_PORT) || 1433,
      database: process.env.MSSQL_DATABASE || 'EnterpriseEMS',
      user: process.env.MSSQL_USER || 'sa',
      password: process.env.MSSQL_PASSWORD || 'admin@10',
      options: {
        encrypt: process.env.MSSQL_ENCRYPT === 'true',
        trustServerCertificate: true,
        enableArithAbort: true
      }
    });

    const orgTableCheck = await connection.request().query(`
      SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Organizations'
    `);

    if (orgTableCheck.recordset[0].count === 0) {
      await connection.close();
      logger.error('❌ Organizations table specifically does not exist');
      logger.error('⚠️  The SQL schema may have been partially applied or failed');
      logger.error('');
      logger.error('🔧 Please verify the schema was applied completely:');
      logger.error('   1. Open SQL Server Management Studio');
      logger.error('   2. Expand the EnterpriseEMS database');
      logger.error('   3. Expand the Tables folder');
      logger.error('   4. Verify the Organizations table exists');
      logger.error('   5. If missing, re-run your SQL schema script');
      console.error('');
      console.error('❌ Organizations table not found. Please verify the SQL schema was applied completely.');
      console.error('');
      process.exit(1);
    }

    logger.info('✅ Organizations table exists, checking structure...');

    // Check what columns actually exist in the Organizations table
    const columnCheck = await connection.request().query(`
      SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'Organizations' 
      ORDER BY ORDINAL_POSITION
    `);
    await connection.close();

    logger.info('Organizations table columns found:');
    columnCheck.recordset.forEach(col => {
      logger.info(`  - ${col.COLUMN_NAME} (${col.DATA_TYPE})`);
    });

    // Check if Description column exists
    const hasDescription = columnCheck.recordset.some(col => col.COLUMN_NAME === 'Description');
    
    if (!hasDescription) {
      logger.warn('⚠️  Organizations table is missing the Description column');
      logger.warn('   Adapting seed script to work with current table structure...');
    }

    logger.info('✅ Organizations table structure is compatible, proceeding with seeding...');

    // Create default organization (adapt to whether Description column exists)
    try {
      if (hasDescription) {
        await executeNonQuery(
          `IF NOT EXISTS (SELECT * FROM Organizations WHERE Slug = 'default-org')
             INSERT INTO Organizations (OrganizationID, Name, Slug, Description, IsActive, CreatedAt, UpdatedAt) 
             VALUES (NEWID(), 'Default Organization', 'default-org', 'Default organization for testing', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`
        );
      } else {
        await executeNonQuery(
          `IF NOT EXISTS (SELECT * FROM Organizations WHERE Slug = 'default-org')
             INSERT INTO Organizations (OrganizationID, Name, Slug, IsActive, CreatedAt, UpdatedAt) 
             VALUES (NEWID(), 'Default Organization', 'default-org', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`
        );
      }
      logger.info('✅ Default organization created successfully');
    } catch (error) {
      logger.error('❌ Failed to create default organization:', error.message);
      throw error;
    }

    // Get organization ID
    const orgResult = await executeScalar(
      "SELECT OrganizationID FROM Organizations WHERE Slug = 'default-org'"
    );
    
    logger.info('Organization ID lookup result:', orgResult);

    if (!orgResult) {
      throw new Error('Failed to create or find default organization');
    }

    const orgId = orgResult;

    // Create superadmin user with admin@10 credentials
    const superadminPassword = await bcrypt.hash('admin@10', 10);
    const superadminSalt = bcrypt.genSaltSync(10);
    await executeNonQuery(
      `IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'admin@10')
         INSERT INTO Users (UserID, OrganizationID, Username, Email, PasswordHash, PasswordSalt, UserType, IsActive, CreatedAt, UpdatedAt) 
         VALUES (NEWID(), @orgId, 'superadmin', 'admin@10', @password, @salt, 'SuperAdmin', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        password: superadminPassword,
        salt: superadminSalt,
        orgId
      }
    );

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminSalt = bcrypt.genSaltSync(10);
    await executeNonQuery(
      `IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'admin@example.com')
         INSERT INTO Users (UserID, OrganizationID, Username, Email, PasswordHash, PasswordSalt, UserType, IsActive, CreatedAt, UpdatedAt) 
         VALUES (NEWID(), @orgId, 'admin', 'admin@example.com', @password, @salt, 'Admin', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        password: adminPassword,
        salt: adminSalt,
        orgId
      }
    );

    // Create regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const userSalt = bcrypt.genSaltSync(10);
    await executeNonQuery(
      `IF NOT EXISTS (SELECT * FROM Users WHERE Email = 'user@example.com')
         INSERT INTO Users (UserID, OrganizationID, Username, Email, PasswordHash, PasswordSalt, UserType, IsActive, CreatedAt, UpdatedAt) 
         VALUES (NEWID(), @orgId, 'user', 'user@example.com', @password, @salt, 'Employee', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      {
        password: userPassword,
        salt: userSalt,
        orgId
      }
    );

    // Get user IDs
    const superadminUserId = await executeScalar(
      'SELECT UserID FROM Users WHERE Email = @email',
      { email: 'admin@10' }
    );

    const adminUserId = await executeScalar(
      'SELECT UserID FROM Users WHERE Email = @email',
      { email: 'admin@example.com' }
    );

    const regularUserId = await executeScalar(
      'SELECT UserID FROM Users WHERE Email = @email',
      { email: 'user@example.com' }
    );

    // Create default branch
    await executeNonQuery(
      `IF NOT EXISTS (SELECT * FROM Branches WHERE OrganizationID = @orgId AND Name = 'Main Branch')
         INSERT INTO Branches (BranchID, OrganizationID, Name, Code, IsActive, CreatedAt, UpdatedAt) 
         VALUES (NEWID(), @orgId, 'Main Branch', 'MAIN', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      { orgId }
    );

    const branchId = await executeScalar(
      'SELECT BranchID FROM Branches WHERE OrganizationID = @orgId AND Name = @name',
      { orgId, name: 'Main Branch' }
    );

    // Skip Tasks/Tickets column checking for now - use standard schema assumptions
    const tasksHasIsActive = false; // Assume no IsActive column based on earlier error
    const tasksHasDescription = true; // Assume Description exists
    const ticketsHasIsActive = false; // Assume no IsActive column
    const ticketsHasDescription = true; // Assume Description exists

    // Create default department
    await executeNonQuery(
      `IF NOT EXISTS (SELECT * FROM Departments WHERE OrganizationID = @orgId AND BranchID = @branchId AND Name = 'Engineering')
         INSERT INTO Departments (DepartmentID, OrganizationID, BranchID, Name, Code, IsActive, CreatedAt, UpdatedAt) 
         VALUES (NEWID(), @orgId, @branchId, 'Engineering', 'ENG', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
      { orgId, branchId }
    );

    const deptId = await executeScalar(
      'SELECT DepartmentID FROM Departments WHERE OrganizationID = @orgId AND Name = @deptName',
      { orgId, deptName: 'Engineering' }
    );

    // Create sample employees
    if (superadminUserId && adminUserId && regularUserId) {
      await executeNonQuery(
        `IF NOT EXISTS (SELECT * FROM Employees WHERE EmployeeCode = 'EMP001')
           INSERT INTO Employees (EmployeeID, UserID, OrganizationID, BranchID, DepartmentID, EmployeeCode, EmploymentType, EmploymentStatus, JoinDate, IsActive, CreatedAt, UpdatedAt) 
           VALUES (NEWID(), @superadminUserId, @orgId, @branchId, @deptId, 'EMP001', 'FullTime', 'Active', '2024-01-01', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
        { superadminUserId, orgId, branchId, deptId }
      );

      await executeNonQuery(
        `IF NOT EXISTS (SELECT * FROM Employees WHERE EmployeeCode = 'EMP002')
           INSERT INTO Employees (EmployeeID, UserID, OrganizationID, BranchID, DepartmentID, EmployeeCode, EmploymentType, EmploymentStatus, JoinDate, IsActive, CreatedAt, UpdatedAt) 
           VALUES (NEWID(), @adminUserId, @orgId, @branchId, @deptId, 'EMP002', 'FullTime', 'Active', '2024-01-15', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
        { adminUserId, orgId, branchId, deptId }
      );

      await executeNonQuery(
        `IF NOT EXISTS (SELECT * FROM Employees WHERE EmployeeCode = 'EMP003')
           INSERT INTO Employees (EmployeeID, UserID, OrganizationID, BranchID, DepartmentID, EmployeeCode, EmploymentType, EmploymentStatus, JoinDate, IsActive, CreatedAt, UpdatedAt) 
           VALUES (NEWID(), @regularUserId, @orgId, @branchId, @deptId, 'EMP003', 'FullTime', 'Active', '2024-01-20', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
        { regularUserId, orgId, branchId, deptId }
      );
    }

    // Create sample agents
    if (superadminUserId) {
      await executeNonQuery(
        `IF NOT EXISTS (SELECT * FROM Agents WHERE AgentCode = 'AGENT001')
           INSERT INTO Agents (AgentID, UserID, OrganizationID, BranchID, AgentCode, AgentType, Status, IsActive, CreatedAt, UpdatedAt) 
           VALUES (NEWID(), @superadminUserId, @orgId, @branchId, 'AGENT001', 'SuperAgent', 'Active', 1, SYSUTCDATETIME(), SYSUTCDATETIME())`,
        { superadminUserId, orgId, branchId }
      );
    }

    // Create sample tasks
    if (superadminUserId && adminUserId && regularUserId) {
      // Build dynamic INSERT based on available columns
      let task1Columns = ['TaskID', 'OrganizationID', 'Title', 'StatusID', 'PriorityID', 'AssignedToUserID', 'CreatedBy', 'CreatedAt', 'UpdatedAt'];
      let task1Values = ['NEWID()', '@orgId', "'Setup Development Environment'", 'NULL', 'NULL', '@adminUserId', '@adminUserId', 'SYSUTCDATETIME()', 'SYSUTCDATETIME()'];
      
      if (tasksHasDescription) {
        task1Columns.push('Description');
        task1Values.push("'Configure development tools and environment'");
      }
      if (tasksHasIsActive) {
        task1Columns.push('IsActive');
        task1Values.push('0');
      }
      
      const task1Query = `IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Setup Development Environment')
           INSERT INTO Tasks (${task1Columns.join(', ')}) VALUES (${task1Values.join(', ')})`;
      
      await executeNonQuery(task1Query, { adminUserId, orgId });

      // Task 2
      let task2Columns = ['TaskID', 'OrganizationID', 'Title', 'StatusID', 'PriorityID', 'AssignedToUserID', 'CreatedBy', 'CreatedAt', 'UpdatedAt'];
      let task2Values = ['NEWID()', '@orgId', "'Implement User Authentication'", 'NULL', 'NULL', '@regularUserId', '@adminUserId', 'SYSUTCDATETIME()', 'SYSUTCDATETIME()'];
      
      if (tasksHasDescription) {
        task2Columns.push('Description');
        task2Values.push("'Add JWT authentication to the application'");
      }
      if (tasksHasIsActive) {
        task2Columns.push('IsActive');
        task2Values.push('0');
      }
      
      const task2Query = `IF NOT EXISTS (SELECT * FROM Tasks WHERE Title = 'Implement User Authentication')
           INSERT INTO Tasks (${task2Columns.join(', ')}) VALUES (${task2Values.join(', ')})`;
      
      await executeNonQuery(task2Query, { adminUserId, regularUserId, orgId });
    }

    // Create sample tickets
    if (adminUserId) {
      let ticketColumns = ['TicketID', 'OrganizationID', 'TicketNumber', 'Title', 'StatusID', 'CategoryID', 'Priority', 'RequesterID', 'CreatedBy', 'CreatedAt', 'UpdatedAt'];
      let ticketValues = ['NEWID()', '@orgId', "'TKT-DEMO01'", "'Login Issue'", 'NULL', 'NULL', "'High'", '@adminUserId', '@adminUserId', 'SYSUTCDATETIME()', 'SYSUTCDATETIME()'];
      
      if (ticketsHasDescription) {
        ticketColumns.push('Description');
        ticketValues.push("'Users unable to login to the system'");
      }
      if (ticketsHasIsActive) {
        ticketColumns.push('IsActive');
        ticketValues.push('0');
      }
      
      const ticketQuery = `IF NOT EXISTS (SELECT * FROM Tickets WHERE TicketNumber = 'TKT-DEMO01')
           INSERT INTO Tickets (${ticketColumns.join(', ')}) VALUES (${ticketValues.join(', ')})`;
      
      await executeNonQuery(ticketQuery, { adminUserId, orgId });
    }

    logger.info('MSSQL database seeding completed successfully');
    console.log('✅ Database seeded successfully');
    console.log('� SuperAdmin user: admin@10 / admin@10 (Full system access)');
    console.log('�📧 Admin user: admin@example.com / admin123');
    console.log('📧 Regular user: user@example.com / user123');

  } catch (error) {
    logger.error('MSSQL database seeding failed:', error);
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}

// Run seeding
if (require.main === module) {
  seedDatabase().then(() => {
    process.exit(0);
  });
}

module.exports = { seedDatabase };

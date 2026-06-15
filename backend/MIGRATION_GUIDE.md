# Enterprise EMS Database Migration Guide

## Issue Fixed

The application was failing to start due to a database schema mismatch:
- Node.js app was trying to create tables with old schema (lowercase names, `id` columns, simple structure)
- The provided SQL Server schema uses proper enterprise structure (PascalCase names, `UserID` columns, comprehensive tables)
- The error: `Foreign key 'fk_settings_user' references invalid column 'id' in referenced table 'users'`

## Current Situation

Your database currently has the **old schema** which is incompatible with the new enterprise schema. The seed script detected this and stopped to prevent data corruption.

## Solution

You need to manually drop the old database and apply the new schema using SQL Server Management Studio.

## Step-by-Step Instructions

### 1. Drop the Old Database

1. Open **SQL Server Management Studio (SSMS)**
2. Connect to your SQL Server instance (localhost)
3. Right-click on the `EnterpriseEMS` database
4. Select **Delete**
5. Check the checkbox for "Delete backup and restore history records"
6. Click **OK**

**Or execute this SQL query in SSMS:**
```sql
USE master;
GO
DECLARE @SQL NVARCHAR(MAX) = '';
SELECT @SQL = @SQL + 'KILL ' + CONVERT(NVARCHAR, SPID) + ';'
FROM sys.sysprocesses
WHERE DB_NAME(DBID) = 'EnterpriseEMS';
EXEC(@SQL);
GO

DROP DATABASE IF EXISTS EnterpriseEMS;
GO
```

### 2. Create the New Database

```sql
CREATE DATABASE EnterpriseEMS;
GO
```

### 3. Apply the SQL Schema

1. In SSMS, right-click on the new `EnterpriseEMS` database
2. Select **New Query**
3. Paste your complete SQL schema script (the one you provided earlier)
4. Click **Execute** (or press F5)

The schema includes all tables:
- Organizations, Users, Employees, Agents
- Tasks, Tickets, Documents, Workflows
- And 100+ other tables for the complete enterprise structure

### 4. Run the Seed Script

Once the schema is applied successfully, run the seed script:

```bash
cd E:\01\07\06\backend
node seed-mssql.js
```

You should see:
```
✅ Database seeded successfully
📧 Admin user: admin@example.com / admin123
📧 Regular user: user@example.com / user123
```

### 5. Start the Application

```bash
npm start
```

## Important Notes

- **Manual Schema Management**: The database schema is now managed manually via SQL Server Management Studio
- **No Auto-Creation**: The Node.js app will no longer automatically create or modify tables
- **Schema Updates**: Any schema changes should be made via SQL scripts in SSMS
- **Backup**: Always backup your database before making structural changes

## Verification

After completing the steps, verify:

1. ✅ Database `EnterpriseEMS` exists with PascalCase table names
2. ✅ All 100+ tables are created successfully
3. ✅ Seed script runs without errors
4. ✅ Application starts successfully
5. ✅ API endpoints work correctly

## Troubleshooting

**"Old schema detected" error:**
- This means you still have the old database with lowercase table names
- Follow the steps above to drop and recreate it

**"Schema not found" error:**
- The new database exists but the SQL schema hasn't been applied
- Make sure you ran the complete SQL schema script in SSMS

**Connection errors:**
- Verify SQL Server is running
- Check your `.env` file has correct credentials
- Ensure SQL Server allows remote connections
@echo off
echo ========================================
echo MSSQL Database Configuration Setup
echo ========================================
echo.

echo Please enter your MSSQL Server details:
echo.

set /p SERVER="MSSQL Server (default: localhost): "
if "%SERVER%"=="" set SERVER=localhost

set /p PORT="MSSQL Port (default: 1433): "
if "%PORT%"=="" set PORT=1433

set /p DATABASE="Database Name (default: EnterpriseEMS): "
if "%DATABASE%"=="" set DATABASE=EnterpriseEMS

set /p USER="MSSQL Username (default: sa): "
if "%USER%"=="" set USER=sa

set /p PASSWORD="MSSQL Password: "

set /p ENCRYPT="Enable Encryption? (true/false, default: false): "
if "%ENCRYPT%"=="" set ENCRYPT=false

set /p TRUST_CERT="Trust Server Certificate? (true/false, default: true): "
if "%TRUST_CERT%"=="" set TRUST_CERT=true

echo.
echo Creating backend .env file...
cd backend
(
echo NODE_ENV=development
echo BACKEND_PORT=7500
echo FRONTEND_URL=http://localhost:7700
echo MSSQL_SERVER=%SERVER%
echo MSSQL_PORT=%PORT%
echo MSSQL_DATABASE=%DATABASE%
echo MSSQL_USER=%USER%
echo MSSQL_PASSWORD=%PASSWORD%
echo MSSQL_ENCRYPT=%ENCRYPT%
echo MSSQL_TRUST_CERT=%TRUST_CERT%
echo JWT_SECRET=your-jwt-secret-key-change-in-production
echo LOG_LEVEL=info
) > .env

echo .env file created successfully!
echo.
echo Configuration Summary:
echo Server: %SERVER%
echo Port: %PORT%
echo Database: %DATABASE%
echo User: %USER%
echo.
echo Now you can:
echo 1. Install dependencies: npm install
echo 2. Start backend: npm run dev
echo 3. Seed database: npm run seed
echo.
pause

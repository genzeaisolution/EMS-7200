@echo off
echo ========================================
echo Enterprise EMS - MSSQL Startup Script
echo ========================================
echo.

echo [1/6] Checking Backend Environment...
cd backend
if not exist .env (
    echo WARNING: .env file not found!
    echo Please run: setup-mssql-env.bat
    echo.
    pause
    exit /b
)

echo [2/6] Installing Backend dependencies...
if not exist node_modules (
    echo Installing Backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

echo.
echo [3/6] Starting Backend Server...
start "Backend Server - MSSQL" cmd /k "npm run dev"

echo.
echo [4/6] Waiting for Backend to start...
timeout /t 8 /nobreak

echo.
echo [5/6] Starting Frontend Server...
cd ..
if not exist node_modules (
    echo Installing Frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo Starting Frontend...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Servers Starting with MSSQL Database...
echo Frontend: http://localhost:7700
echo Backend: http://localhost:7500
echo Health Check: http://localhost:7500/health
echo Database: MSSQL (EnterpriseEMS)
echo ========================================
echo.
echo Backend will automatically:
echo - Connect to MSSQL database
echo - Create tables if they don't exist
echo - Start accepting API requests
echo.
echo Press any key to close this window...
pause >nul

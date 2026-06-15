@echo off
echo ========================================
echo Enterprise EMS - Startup Script
echo ========================================
echo.

echo [1/4] Checking Backend...
cd backend
if not exist node_modules (
    echo Installing Backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed
)

echo.
echo [2/4] Starting Backend Server...
start "Backend Server" cmd /k "npm run dev"

echo.
echo [3/4] Waiting for Backend to start...
timeout /t 5 /nobreak

echo.
echo [4/4] Starting Frontend Server...
cd ..
if not exist node_modules (
    echo Installing Frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed
)

echo.
echo Starting Frontend...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Servers Starting...
echo Frontend: http://localhost:7700
echo Backend: http://localhost:7500
echo Health Check: http://localhost:7500/health
echo ========================================
echo.
echo Press any key to close this window...
pause >nul

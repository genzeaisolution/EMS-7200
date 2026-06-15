@echo off
echo ========================================
echo Installing Backend Dependencies
echo ========================================
echo.

cd backend

echo Installing MSSQL and other dependencies...
call npm install

echo.
echo ========================================
echo Dependencies Installed Successfully!
echo ========================================
echo.
echo You can now start the backend:
echo npm run dev
echo.
pause

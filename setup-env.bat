@echo off
echo Creating Frontend .env file...
(
echo VITE_API_URL=http://localhost:7500/api
echo VITE_APP_NAME=Enterprise Management System
echo VITE_APP_VERSION=1.0.0
echo VITE_FRONTEND_PORT=7700
echo VITE_ENABLE_ANALYTICS=false
echo VITE_ENABLE_DEBUG=false
) > .env
echo .env file created successfully!
echo.
echo Now run: start-all.bat
pause

# Enterprise EMS - Complete Setup Guide

Complete Enterprise Management System with React frontend and Node.js backend.

## Project Structure

```
enterprise-ems/
├── backend/                  # Node.js/Express backend
│   ├── src/
│   ├── database/
│   ├── logs/
│   ├── uploads/
│   └── ...
├── src/                      # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
├── .env.example
├── package.json
└── vite.config.ts
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PM2 (for production deployment)

## Setup Instructions

### 1. Frontend Setup

1. Install frontend dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update frontend `.env` file:
```env
VITE_API_URL=http://localhost:7500/api
VITE_APP_NAME=Enterprise Management System
VITE_APP_VERSION=1.0.0
VITE_FRONTEND_PORT=7700
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install backend dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env .env.example
```

4. Update backend `.env` file:
```env
NODE_ENV=development
BACKEND_PORT=7500
FRONTEND_URL=http://localhost:7700
JWT_SECRET=your-jwt-secret-key-change-in-production
LOG_LEVEL=info
DB_PATH=./database/enterprise.db
```

### 3. Running the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:7700
- Backend: http://localhost:7500
- API Health: http://localhost:7500/health

#### Production Mode with PM2

1. Start backend with PM2:
```bash
cd backend
pm2 start ecosystem.config.js
```

2. Build frontend:
```bash
npm run build
```

3. Serve frontend (using any static server):
```bash
npm run preview
```

Or use PM2 for frontend as well:
```bash
pm2 start npm --name "enterprise-ems-frontend" -- start
pm2 save
pm2 startup
```

## Configuration

### Ports
- Frontend: 7700
- Backend: 7500

### Database
- SQLite database located at `backend/database/enterprise.db`
- Automatically created on first backend run

### Logging
- Backend logs: `backend/logs/`
- Includes error logs, API logs, database logs, and PM2 logs

## API Connection

The frontend is configured to connect to the backend via:
- Environment variable: `VITE_API_URL`
- Vite proxy configuration in `vite.config.ts`

## Testing the Setup

1. Check backend health:
```bash
curl http://localhost:7500/health
```

2. Register a user:
```bash
curl -X POST http://localhost:7500/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

3. Login:
```bash
curl -X POST http://localhost:7500/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## PM2 Commands

```bash
# Start application
pm2 start ecosystem.config.js

# List all processes
pm2 list

# Show logs
pm2 logs

# Stop application
pm2 stop enterprise-ems-backend

# Restart application
pm2 restart enterprise-ems-backend

# Delete application
pm2 delete enterprise-ems-backend

# Monitor
pm2 monit

# Save process list
pm2 save

# Generate startup script
pm2 startup
```

## Features

### Backend
- RESTful API with Express.js
- SQLite database
- JWT authentication
- Comprehensive logging
- PM2 process management
- File upload support
- Rate limiting
- CORS enabled

### Frontend
- React with TypeScript
- Material-UI components
- React Router for navigation
- Axios for API calls
- Zustand for state management
- Form validation with React Hook Form
- Data visualization with Recharts

## Security Notes

1. Change the `JWT_SECRET` in production
2. Use environment variables for sensitive data
3. Enable CORS for specific domains only in production
4. Review rate limiting settings based on your needs
5. Keep dependencies updated

## Troubleshooting

### Backend won't start
- Check if port 7500 is already in use
- Verify node_modules are installed
- Check environment variables

### Frontend can't connect to backend
- Verify backend is running
- Check `VITE_API_URL` in frontend .env
- Check CORS configuration in backend

### Database errors
- Ensure database directory exists
- Check file permissions
- Verify SQLite is properly installed

### PM2 issues
- Check PM2 logs: `pm2 logs`
- Restart PM2: `pm2 restart all`
- Reset PM2: `pm2 delete all`

## Development Workflow

1. Make changes to backend or frontend
2. Backend changes auto-restart with nodemon (dev mode)
3. Frontend hot-reloads automatically
4. Check logs in `backend/logs/` for issues
5. Test API endpoints with curl or Postman

## Production Deployment

1. Set `NODE_ENV=production` in backend .env
2. Use strong JWT secrets
3. Configure proper CORS origins
4. Set up reverse proxy (nginx/Apache)
5. Enable HTTPS
6. Set up database backups
7. Configure monitoring and alerts

## Support

For issues or questions:
1. Check logs in `backend/logs/`
2. Review this setup guide
3. Check backend/README.md for backend-specific details

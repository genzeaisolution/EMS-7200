# Quick Start Guide - Enterprise EMS

Complete backend and frontend setup with database, PM2, and logging configured.

## 📋 What's Been Created

### Backend (Port 7500)
- ✅ Node.js/Express REST API
- ✅ SQLite database with 9 tables
- ✅ JWT authentication system
- ✅ Winston logging (error, api, database, combined logs)
- ✅ PM2 configuration for production
- ✅ Complete CRUD operations for all resources
- ✅ Security middleware (Helmet, CORS, Rate limiting)
- ✅ File upload support

### Frontend (Port 7700)
- ✅ React with TypeScript
- ✅ Material-UI components
- ✅ Connected to backend API
- ✅ Vite configuration updated
- ✅ Environment variables configured

### Database Tables
- users, organizations, employees, agents, tasks, tickets, documents, workflows, settings

## 🚀 Quick Start

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Setup Environment Files

**Frontend .env (create manually):**
```env
VITE_API_URL=http://localhost:7500/api
VITE_APP_NAME=Enterprise Management System
VITE_APP_VERSION=1.0.0
VITE_FRONTEND_PORT=7700
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=false
```

**Backend .env (already created):**
```env
NODE_ENV=development
BACKEND_PORT=7500
FRONTEND_URL=http://localhost:7700
JWT_SECRET=your-jwt-secret-key-change-in-production
LOG_LEVEL=info
DB_PATH=./database/enterprise.db
```

### 3. Start Applications

**Development Mode:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Production Mode with PM2:**
```bash
cd backend
npm run seed  # Seed database with sample data
pm2 start ecosystem.config.js
pm2 logs
```

### 4. Access Applications

- Frontend: http://localhost:7700
- Backend API: http://localhost:7500
- Health Check: http://localhost:7500/health
- API Documentation: See backend/README.md

## 🧪 Test the Setup

### 1. Health Check
```bash
curl http://localhost:7500/health
```

### 2. Seed Database
```bash
cd backend
npm run seed
```

### 3. Register User
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

### 4. Login
```bash
curl -X POST http://localhost:7500/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📂 Project Structure

```
enterprise-ems/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   ├── index.js          # Database initialization
│   │   │   └── seed.js           # Sample data seeding
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT authentication
│   │   ├── routes/
│   │   │   ├── auth.js           # /api/auth/*
│   │   │   ├── users.js          # /api/users/*
│   │   │   ├── organizations.js  # /api/organizations/*
│   │   │   ├── employees.js      # /api/employees/*
│   │   │   ├── agents.js         # /api/agents/*
│   │   │   ├── tasks.js          # /api/tasks/*
│   │   │   ├── tickets.js        # /api/tickets/*
│   │   │   ├── documents.js      # /api/documents/*
│   │   │   ├── workflows.js      # /api/workflows/*
│   │   │   ├── reports.js        # /api/reports/*
│   │   │   └── settings.js       # /api/settings/*
│   │   ├── utils/
│   │   │   ├── logger.js         # Winston logging
│   │   │   └── init.js           # Directory initialization
│   │   └── server.js             # Main server
│   ├── database/                 # SQLite database (auto-created)
│   ├── logs/                     # Application logs
│   ├── uploads/                  # File uploads
│   ├── ecosystem.config.js       # PM2 configuration
│   ├── package.json
│   ├── .env
│   └── README.md
├── src/                          # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
├── .env.example
├── package.json
├── vite.config.ts
├── SETUP.md
└── README.md
```

## 🔧 Configuration Files

### Ports
- Frontend: 7700
- Backend: 7500

### Environment Variables
- Backend: `backend/.env`
- Frontend: `.env` (create from `.env.example`)

### PM2 Configuration
- File: `backend/ecosystem.config.js`
- Commands: `pm2 start/stop/restart ecosystem.config.js`

## 📊 Logging System

Logs are automatically created in `backend/logs/`:
- `error.log` - Error messages
- `combined.log` - All logs
- `api.log` - API requests/responses
- `database.log` - Database operations
- `pm2-error.log` - PM2 errors
- `pm2-out.log` - PM2 output
- `pm2-combined.log` - PM2 combined logs

## 🔐 Default Seed Data

After running `npm run seed` in backend:

**Admin User:**
- Email: admin@example.com
- Password: admin123
- Role: admin

**Regular User:**
- Email: user@example.com
- Password: user123
- Role: user

## 🛠️ PM2 Commands

```bash
# Start
pm2 start ecosystem.config.js

# Status
pm2 status

# Logs
pm2 logs

# Restart
pm2 restart enterprise-ems-backend

# Stop
pm2 stop enterprise-ems-backend

# Delete
pm2 delete enterprise-ems-backend

# Monitor
pm2 monit

# Save startup
pm2 save
pm2 startup
```

## 🔗 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user

### Resources
- GET/POST `/api/users` - User management
- GET/POST `/api/organizations` - Organization management
- GET/POST `/api/employees` - Employee management
- GET/POST `/api/agents` - Agent management
- GET/POST/DELETE `/api/tasks` - Task management
- GET/POST `/api/tickets` - Ticket management
- GET/POST/DELETE `/api/documents` - Document management
- GET/POST `/api/workflows` - Workflow management
- GET `/api/reports/*` - Reports and analytics
- GET/PUT `/api/settings/*` - Settings management

See `backend/README.md` for complete API documentation.

## 🐛 Troubleshooting

**Backend won't start:**
```bash
# Check if port is in use
netstat -ano | findstr :7500

# Kill process if needed
taskkill /PID <PID> /F
```

**Frontend can't connect:**
- Verify backend is running
- Check `VITE_API_URL` in frontend .env
- Check CORS configuration

**Database errors:**
- Database auto-creates on first run
- Check `backend/database/` directory permissions

## 📝 Next Steps

1. Change JWT_SECRET in production
2. Configure proper CORS origins
3. Set up reverse proxy (nginx)
4. Enable HTTPS
5. Configure database backups
6. Set up monitoring
7. Review rate limiting settings

## 📚 Documentation

- Backend: `backend/README.md`
- Setup: `SETUP.md`
- This Guide: `QUICKSTART.md`

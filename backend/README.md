# Enterprise EMS Backend

Complete backend for Enterprise Management System with Node.js, Express, and SQLite.

## Features

- RESTful API with Express.js
- SQLite database for data persistence
- JWT authentication
- Comprehensive logging with Winston
- PM2 process management
- CORS enabled
- Rate limiting
- File upload support
- Error handling middleware

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update environment variables in `.env`:
```env
NODE_ENV=development
BACKEND_PORT=7500
FRONTEND_URL=http://localhost:7700
JWT_SECRET=your-jwt-secret-key
LOG_LEVEL=info
```

## Database

The database is automatically created on first run in the `database/` directory.

### Database Structure

- **users**: User accounts and authentication
- **organizations**: Organization/tenant management
- **employees**: Employee information and management
- **agents**: AI agents configuration
- **tasks**: Task management
- **tickets**: Support tickets
- **documents**: File management
- **workflows**: Workflow definitions
- **settings**: Application settings

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode with PM2
```bash
pm2 start ecosystem.config.js
pm2 logs
pm2 stop enterprise-ems-backend
pm2 restart enterprise-ems-backend
```

### Direct Node.js
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Organizations
- `GET /api/organizations` - Get all organizations
- `GET /api/organizations/:id` - Get organization by ID
- `POST /api/organizations` - Create organization (admin)
- `PUT /api/organizations/:id` - Update organization (admin)

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee

### Agents
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get agent by ID
- `POST /api/agents` - Create agent
- `PUT /api/agents/:id` - Update agent

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get ticket by ID
- `POST /api/tickets` - Create ticket
- `PUT /api/tickets/:id` - Update ticket

### Documents
- `GET /api/documents` - Get all documents
- `GET /api/documents/:id` - Get document by ID
- `POST /api/documents` - Upload document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### Workflows
- `GET /api/workflows` - Get all workflows
- `GET /api/workflows/:id` - Get workflow by ID
- `POST /api/workflows` - Create workflow
- `PUT /api/workflows/:id` - Update workflow

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/tasks` - Get task reports
- `GET /api/reports/tickets` - Get ticket reports
- `GET /api/reports/employees` - Get employee reports

### Settings
- `GET /api/settings/user/:userId` - Get user settings
- `GET /api/settings/organization/:orgId` - Get organization settings
- `PUT /api/settings/user/:userId` - Update user setting
- `PUT /api/settings/organization/:orgId` - Update organization setting

## Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error logs
- `combined.log` - All logs
- `api.log` - API-specific logs
- `database.log` - Database operation logs
- `pm2-error.log` - PM2 error logs
- `pm2-out.log` - PM2 output logs
- `pm2-combined.log` - PM2 combined logs

## Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes per IP)
- JWT token authentication
- Password hashing with bcrypt
- Input validation with express-validator
- File upload size limits (10MB)

## Directory Structure

```
backend/
├── src/
│   ├── database/
│   │   └── index.js          # Database initialization
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── users.js          # User routes
│   │   ├── organizations.js  # Organization routes
│   │   ├── employees.js      # Employee routes
│   │   ├── agents.js         # Agent routes
│   │   ├── tasks.js          # Task routes
│   │   ├── tickets.js        # Ticket routes
│   │   ├── documents.js      # Document routes
│   │   ├── workflows.js      # Workflow routes
│   │   ├── reports.js        # Report routes
│   │   └── settings.js       # Settings routes
│   ├── utils/
│   │   └── logger.js         # Winston logger configuration
│   └── server.js             # Main server file
├── database/                 # SQLite database files
├── logs/                     # Application logs
├── uploads/                  # Uploaded files
├── ecosystem.config.js       # PM2 configuration
├── package.json
├── .env
└── .env.example
```

## Health Check

Check if the backend is running:
```bash
curl http://localhost:7500/health
```

## Default Ports

- Backend: 7500
- Frontend: 7700

# Enterprise Management System (EMS)

A complete, production-ready full-stack Enterprise Management System with React frontend and Node.js backend. This application provides a comprehensive interface for managing organizations, employees, agents, tasks, tickets, documents, workflows, and more.

## 🌟 GitHub Demo Version

A **frontend-only demo version** is available for GitHub Pages deployment! This version:
- ✅ Works without any backend
- ✅ Uses localStorage for authentication
- ✅ Includes mock data for all modules
- ✅ Demo credentials: `admin` / `admin@10`
- ✅ Perfect for portfolio showcases

See [GITHUB_README.md](./GITHUB_README.md) for the demo version setup and deployment guide.

## Features

### Full-Stack Architecture
- **Frontend**: React 18 with TypeScript and Material-UI
- **Backend**: Node.js with Express.js
- **Database**: SQLite with automatic schema creation
- **Process Management**: PM2 for production deployment
- **Logging**: Winston with comprehensive log management
- **Authentication**: JWT-based security system

### Core Modules
- **Authentication**: Login, registration, password reset, and email verification
- **Organization Management**: Multi-tenant organization and branch management
- **Employee Management**: Complete employee lifecycle management
- **Agent Management**: Sales agent performance tracking and commission management
- **Task Management**: Task assignment, tracking, and collaboration
- **Ticketing System**: Customer support and issue tracking
- **Document Management**: File storage with version control and permissions
- **Workflow Engine**: Multi-level approval workflows
- **Reporting & Analytics**: Comprehensive dashboards and custom reports
- **Settings**: User preferences and system configuration

### Key Features
- 🎨 Modern UI with Material-UI components
- 📱 Fully responsive design
- 🔐 Role-based access control (RBAC)
- 📊 Real-time dashboards with charts and graphs
- 🔔 Notification system
- 📁 Document management with version control
- 🔄 Workflow approval system
- 📈 Performance analytics and reporting
- 🌐 Multi-language support ready
- 🌙 Dark mode support

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Rich Text**: React Quill
- **Date Handling**: date-fns
- **Icons**: Material-UI Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Process Management**: PM2
- **File Upload**: Multer
- **Validation**: express-validator
- **Password Hashing**: bcryptjs

## Project Structure

```
enterprise-ems/
├── backend/                    # Node.js/Express backend
│   ├── src/
│   │   ├── database/
│   │   │   ├── index.js        # Database initialization
│   │   │   └── seed.js         # Sample data seeding
│   │   ├── middleware/
│   │   │   └── auth.js         # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication routes
│   │   │   ├── users.js        # User management
│   │   │   ├── organizations.js
│   │   │   ├── employees.js
│   │   │   ├── agents.js
│   │   │   ├── tasks.js
│   │   │   ├── tickets.js
│   │   │   ├── documents.js
│   │   │   ├── workflows.js
│   │   │   ├── reports.js
│   │   │   └── settings.js
│   │   ├── utils/
│   │   │   ├── logger.js       # Winston logging
│   │   │   └── init.js         # Directory initialization
│   │   └── server.js           # Main server
│   ├── database/               # SQLite database
│   ├── logs/                   # Application logs
│   ├── uploads/                # File uploads
│   ├── ecosystem.config.js     # PM2 configuration
│   └── package.json
├── src/                        # React frontend
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.tsx      # Main layout with sidebar navigation
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.tsx       # Login page
│   │   │   ├── Register.tsx    # Registration page
│   │   │   └── ForgotPassword.tsx
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx   # Main dashboard with analytics
│   │   ├── Organizations/
│   │   ├── Employees/
│   │   ├── Agents/
│   │   ├── Tasks/
│   │   ├── Tickets/
│   │   ├── Documents/
│   │   ├── Workflows/
│   │   ├── Reports/
│   │   └── Settings/
│   ├── services/
│   │   ├── api.ts              # Axios API client with interceptors
│   │   └── authService.ts     # Authentication service
│   ├── store/
│   │   └── authStore.ts        # Zustand auth store
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles
├── .env.example
├── package.json
├── vite.config.ts
├── SETUP.md
├── QUICKSTART.md
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd enterprise-ems
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Create environment files:

**Frontend:**
```bash
cp .env.example .env
```

**Backend:**
```bash
cd backend
cp .env.example .env
```

5. Configure environment variables:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:7500/api
VITE_APP_NAME=Enterprise Management System
VITE_APP_VERSION=1.0.0
VITE_FRONTEND_PORT=7700
```

**Backend (backend/.env):**
```env
NODE_ENV=development
BACKEND_PORT=7500
FRONTEND_URL=http://localhost:7700
JWT_SECRET=your-jwt-secret-key
LOG_LEVEL=info
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The applications will be available at:
- Frontend: `http://localhost:7700`
- Backend: `http://localhost:7500`
- Health Check: `http://localhost:7500/health`

### Production Mode with PM2

**Backend:**
```bash
cd backend
pm2 start ecosystem.config.js
```

**Frontend:**
```bash
npm run build
npm run preview
```

Or use PM2 for both:
```bash
pm2 start npm --name "enterprise-ems-frontend" -- start
pm2 save
pm2 startup
```

## API Integration

The frontend connects to the backend RESTful API. The API client is configured in `src/services/api.ts` with:

- Request interceptors for authentication
- Response interceptors for error handling
- Automatic token refresh
- Error boundary handling

## Database

The backend uses SQLite for data persistence. The database is automatically created on first run in the `backend/database/` directory.

### Database Tables
- users (user accounts and authentication)
- organizations (multi-tenant management)
- employees (employee information)
- agents (AI agents configuration)
- tasks (task management)
- tickets (support tickets)
- documents (file management)
- workflows (workflow definitions)
- settings (application settings)

### Seed Data
Run the seed script to populate the database with sample data:
```bash
cd backend
npm run seed
```

Default users:
- Admin: admin@example.com / admin123
- User: user@example.com / user123

## Process Management (PM2)

The backend includes PM2 configuration for production deployment:

```bash
cd backend
pm2 start ecosystem.config.js
pm2 logs
pm2 status
pm2 restart enterprise-ems-backend
```

## Logging

Comprehensive logging is configured using Winston:
- Error logs: `backend/logs/error.log`
- API logs: `backend/logs/api.log`
- Database logs: `backend/logs/database.log`
- Combined logs: `backend/logs/combined.log`
- PM2 logs: `backend/logs/pm2-*.log`

## Documentation

- **Quick Start**: See [QUICKSTART.md](QUICKSTART.md)
- **Setup Guide**: See [SETUP.md](SETUP.md)
- **Backend Details**: See [backend/README.md](backend/README.md)

## Database Schema Compatibility

This frontend is built to work with the provided SQL Server database schema including:

- 80+ tables across 20+ modules
- Multi-tenant architecture
- Role-based access control
- Audit logging
- Performance indexes

## Key Components

### Authentication
- JWT token-based authentication
- Password hashing with salt
- Email verification
- Password reset functionality
- Session management
- MFA support ready

### Layout & Navigation
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- User profile menu
- Notification badges
- Breadcrumb navigation

### Data Tables
- Sortable columns
- Filtering and search
- Pagination
- Bulk actions
- Export functionality

### Forms
- React Hook Form integration
- Yup schema validation
- Error handling
- Loading states
- Success/error notifications

### Charts & Analytics
- Revenue charts
- Performance metrics
- Ticket status distribution
- Agent performance comparison
- Custom report generation

## Customization

### Adding New Modules

1. Create a new directory in `src/pages/`
2. Add list and detail components
3. Update routing in `App.tsx`
4. Add menu item in `Layout.tsx`
5. Create corresponding types in `src/types/index.ts`
6. Add API service methods

### Styling

The application uses Material-UI's theming system. Customize the theme in `src/main.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

- JWT authentication
- Protected routes
- Role-based access control
- XSS protection
- CSRF protection ready
- Secure HTTP headers
- Input validation

## Performance Optimization

- Code splitting with React.lazy
- Lazy loading of routes
- Image optimization ready
- API response caching with React Query
- Bundle size optimization

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

## Future Enhancements

- Real-time updates with WebSocket
- Offline support with PWA
- Mobile app (React Native)
- Advanced filtering and search
- Custom dashboard builder
- Integration with third-party services
- Advanced reporting features
- AI-powered insights

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

---

Built with ❤️ for Enterprise Management
"# EMS---Employee-Management-System" 

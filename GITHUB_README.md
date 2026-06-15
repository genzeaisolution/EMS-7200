# Enterprise Management System - GitHub Demo Version

A complete, fully functional Enterprise Management System frontend demo that works entirely without a backend. This version uses localStorage for authentication and mock data services, making it perfect for GitHub Pages deployment or portfolio showcases.

## 🚀 Features

### Core Modules
- **Authentication System** - Login, Register, Password Reset with mock credentials
- **Dashboard** - Overview with statistics and charts
- **Organization Management** - Create, view, edit organizations
- **Employee Management** - Complete employee directory and profiles
- **Agent Management** - Sales/Support agent tracking and performance
- **Task Management** - Task assignment, tracking, and completion
- **Ticket System** - Support ticket management and resolution
- **Document Management** - File upload, organization, and sharing
- **Workflow Management** - Business process automation
- **Reports** - Analytics and performance reports
- **Settings** - System configuration and preferences

### Key Features
- ✅ **Fully Functional** - Every button, form, and interaction works
- ✅ **No Backend Required** - Uses localStorage and mock services
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Modern UI** - Built with Material-UI components
- ✅ **Type-Safe** - Written in TypeScript
- ✅ **Authentication** - Secure login with demo credentials
- ✅ **Data Persistence** - Uses localStorage for data storage

## 🔐 Demo Credentials

For this GitHub demo version, use the following credentials:

**Username:** `admin`  
**Password:** `admin@10`

> ⚠️ **Security Note:** These credentials are hardcoded in the frontend for demo purposes. Do not use this authentication method in production.

## 🛠️ Installation & Setup

### Local Development

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd enterprise-ems
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### GitHub Pages Deployment

1. **Install dependencies**
```bash
npm install
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy to GitHub Pages**
- Go to your repository Settings → Pages
- Set source to `deploy from a branch`
- Select `main` branch and `/dist` folder
- Save and your site will be live!

## 📁 Project Structure

```
enterprise-ems/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.tsx          # Main layout with sidebar navigation
│   ├── pages/
│   │   ├── Auth/
│   │   │   ├── Login.tsx          # Login page with demo credentials
│   │   │   ├── Register.tsx       # Registration page
│   │   │   └── ForgotPassword.tsx # Password reset page
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx      # Main dashboard
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
│   │   ├── mockAuthService.ts     # Mock authentication service
│   │   ├── mockDataService.ts     # Mock data services for all modules
│   │   └── index.ts               # Service exports (mock/real switch)
│   ├── store/
│   │   └── authStore.ts           # Authentication state management
│   ├── types/
│   │   └── index.ts               # TypeScript type definitions
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite configuration
```

## 🎯 Usage Guide

### Authentication
1. Navigate to the login page
2. Enter demo credentials: `admin` / `admin@10`
3. Click "Sign In" to access the dashboard

### Navigation
- Use the sidebar to navigate between modules
- Click on any item in the lists to view details
- Use the action buttons (View, Edit, Delete) to manage items

### Data Management
- **Create:** Use the "Add" buttons to create new items
- **Read:** View details by clicking on items in lists
- **Update:** Edit items using the Edit button
- **Delete:** Remove items using the Delete button

All data is stored in localStorage and persists between sessions.

## 🎨 Customization

### Change Demo Credentials
Edit `src/services/mockAuthService.ts`:
```typescript
const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin@10';
```

### Modify Footer Text
The footer text "Powered by GenZe AI Solution" is displayed in:
- `src/components/Layout/Layout.tsx` (for authenticated pages)
- `src/pages/Auth/Login.tsx`
- `src/pages/Auth/Register.tsx`
- `src/pages/Auth/ForgotPassword.tsx`

### Switch to Real Backend
Edit `src/services/index.ts`:
```typescript
const USE_MOCK_SERVICES = false; // Change to false
```

## 🔧 Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 4
- **UI Library:** Material-UI (MUI) 5
- **Routing:** React Router 6
- **State Management:** Zustand 4
- **Forms:** React Hook Form 7
- **Validation:** Yup
- **Charts:** Recharts
- **HTTP Client:** Axios (mocked for demo)
- **Icons:** Material Icons

## 📝 Key Features Explained

### Authentication System
- localStorage-based session management
- Demo credentials: admin/admin@10
- Automatic session persistence
- Secure logout functionality

### Mock Data Services
All modules use comprehensive mock data services:
- Pre-populated with realistic sample data
- Full CRUD operations (Create, Read, Update, Delete)
- Search and filtering capabilities
- Pagination support

### Responsive Layout
- Collapsible sidebar for mobile
- Adaptive grid layouts
- Touch-friendly controls
- Material Design guidelines

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is a demo version for GitHub Pages. For the full production version with backend integration, please refer to the main repository.

## 📄 License

This project is for demonstration purposes.

## 🙏 Acknowledgments

- **Powered by GenZe AI Solution** - As displayed in the footer
- Built with modern web technologies
- Material-UI for the beautiful interface
- Vite for fast development and building

## 📞 Support

For questions or issues related to this demo, please open an issue in the repository.

---

**Note:** This is a frontend-only demo version. All data is stored in your browser's localStorage and will be cleared if you clear your browser data. For production use, integrate with a proper backend API.

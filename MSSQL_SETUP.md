# MSSQL Database Setup Guide

आपका Enterprise Management System अब MSSQL (Microsoft SQL Server) database के साथ fully connected है। यह production-level dynamic है और आपके local MSSQL database से real data show करेगा।

## ✅ क्या बदला गया (What Changed)

### Backend Updates:
- ✅ MSSQL driver (`mssql`) added किया गया
- ✅ Database connection MSSQL के लिए configure किया गया
- ✅ Database schema MSSQL syntax में convert किया गया
- ✅ सभी API routes MSSQL queries के साथ update किए गए
- ✅ Seed script MSSQL के लिए updated
- ✅ Environment configuration MSSQL credentials के लिए updated

## 🚀 Setup Steps

### Step 1: MSSQL Server Install करें

अगर आपके पास MSSQL Server नहीं है:

1. **SQL Server Express** download करें: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
2. Install करें और "Mixed Mode" authentication select करें
3. SQL Server Management Studio (SSMS) install करें

### Step 2: Database Create करें

SSMS में यह query run करें:

```sql
CREATE DATABASE EnterpriseEMS;
GO
```

### Step 3: Environment Configuration Setup

**Automatic Setup (Recommended):**
```bash
setup-mssql-env.bat
```

**Manual Setup:**

Backend `.env` file create करें और यह values add करें:

```env
# Server Configuration
NODE_ENV=development
BACKEND_PORT=7500
FRONTEND_URL=http://localhost:7700

# MSSQL Database Configuration
MSSQL_SERVER=localhost
MSSQL_PORT=1433
MSSQL_DATABASE=EnterpriseEMS
MSSQL_USER=sa
MSSQL_PASSWORD=YourStrongPassword123!
MSSQL_ENCRYPT=false
MSSQL_TRUST_CERT=true

# Authentication
JWT_SECRET=your-jwt-secret-key-change-in-production

# Logging
LOG_LEVEL=info

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important:** अपने actual MSSQL credentials से replace करें:
- `MSSQL_USER` - आपका SQL Server username
- `MSSQL_PASSWORD` - आपका SQL Server password
- `MSSQL_DATABASE` - आपका database name
- `MSSQL_SERVER` - आपका server address (localhost या IP)

### Step 4: Dependencies Install करें

```bash
cd backend
npm install
```

### Step 5: Backend Start करें

```bash
cd backend
npm run dev
```

### Step 6: Database Seed करें (Optional)

```bash
cd backend
npm run seed
```

यह sample data create करेगा:
- Admin user: admin@example.com / admin123
- Regular user: user@example.com / user123
- Sample organization, employees, tasks, tickets

## 🎯 MSSQL Connection Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| MSSQL_SERVER | SQL Server address | localhost |
| MSSQL_PORT | SQL Server port | 1433 |
| MSSQL_DATABASE | Database name | EnterpriseEMS |
| MSSQL_USER | Database username | sa |
| MSSQL_PASSWORD | Database password | Your password |
| MSSQL_ENCRYPT | Enable encryption | false |
| MSSQL_TRUST_CERT | Trust server certificate | true |

## 📊 Database Schema

यह schema automatically create होगी जब आप पहली बार backend start करेंगे:

### Tables:
- **organizations** - Organization/tenant management
- **users** - User accounts and authentication
- **employees** - Employee information
- **agents** - AI agents configuration
- **tasks** - Task management
- **tickets** - Support tickets
- **documents** - File management
- **workflows** - Workflow definitions
- **settings** - Application settings

### Features:
- Identity columns for auto-increment IDs
- Foreign key constraints
- Indexes for performance
- DATETIME for timestamps
- NVARCHAR for Unicode support
- BIT for boolean values

## 🔍 Connection Troubleshooting

### Connection Failed Errors:

1. **Check SQL Server is running:**
   - Open "SQL Server Configuration Manager"
   - Verify "SQL Server" service is running

2. **Enable TCP/IP:**
   - SQL Server Configuration Manager → Network Configuration
   - Enable TCP/IP protocol
   - Restart SQL Server service

3. **Enable SQL Server Authentication:**
   - SSMS → Server Properties → Security
   - Select "SQL Server and Windows Authentication mode"
   - Restart SQL Server

4. **Check Firewall:**
   - Allow port 1433 through Windows Firewall
   - Or disable firewall temporarily for testing

5. **Test Connection:**
   ```bash
   telnet localhost 1433
   ```
   यह connect हो जाए तो port open है।

### Common Errors:

**"Login failed for user"**
- Check username and password
- Verify SQL Server Authentication is enabled
- User has proper permissions

**"Cannot open server"**
- Check server name is correct
- SQL Server is running
- Network connectivity

**"Database does not exist"**
- Create database manually: `CREATE DATABASE EnterpriseEMS;`
- Check database name in .env file

## 🧪 Testing Connection

Backend start करने के बाद:

```bash
curl http://localhost:7500/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 📝 Production Configuration

Production के लिए:

```env
NODE_ENV=production
MSSQL_SERVER=your-production-server
MSSQL_PORT=1433
MSSQL_DATABASE=EnterpriseEMS_Prod
MSSQL_USER=production_user
MSSQL_PASSWORD=strong-production-password
MSSQL_ENCRYPT=true
MSSQL_TRUST_CERT=false
JWT_SECRET=very-strong-secret-key
LOG_LEVEL=error
```

## 🔒 Security Best Practices

1. **Strong Passwords:** Always use strong database passwords
2. **Environment Variables:** Never commit .env file to git
3. **Least Privilege:** Use specific database user with limited permissions
4. **Encryption:** Enable encryption in production
5. **Connection Pooling:** Configure appropriate pool size
6. **Backup:** Regular database backups
7. **Monitoring:** Monitor connection performance

## 🎨 Using Your Existing Database

अगर आपके पास पहले से MSSQL database है जिसे आप use करना चाहते हैं:

1. `.env` file में अपने database credentials configure करें
2. अगर tables पहले से exist करते हैं, तो schema automatically skip हो जाएगी
3. अगर आप अपना custom schema use करना चाहते हैं:
   - `backend/src/database/mssql-schema.js` में अपना schema add करें
   - या database में manually tables create करें

## 📚 API Endpoints

Backend MSSQL के साथ fully functional है:

- Authentication: `/api/auth/*`
- Users: `/api/users/*`
- Organizations: `/api/organizations/*`
- Employees: `/api/employees/*`
- Agents: `/api/agents/*`
- Tasks: `/api/tasks/*`
- Tickets: `/api/tickets/*`
- Documents: `/api/documents/*`
- Workflows: `/api/workflows/*`
- Reports: `/api/reports/*`
- Settings: `/api/settings/*`

## 🚦 Complete Startup

```bash
# 1. Setup environment
setup-mssql-env.bat

# 2. Install dependencies
cd backend
npm install

# 3. Start backend
npm run dev

# 4. Seed database (optional)
npm run seed

# 5. Start frontend (another terminal)
cd ..
npm run dev
```

## 🎉 Success!

अब आपका system:
- ✅ MSSQL database से connected है
- ✅ Real data show करेगा (fake data नहीं)
- ✅ Production level है
- ✅ Fully dynamic है
- ✅ Secure है

अपने MSSQL database में data add करें और frontend में real दिखेगा! 🚀

---

**Support:** किसी भी issue के लिए logs check करें: `backend/logs/`

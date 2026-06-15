module.exports = {
  apps: [
    {
      name: 'enterprise-ems-backend',
      script: './src/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 7500,
        BACKEND_PORT: 7500,
        FRONTEND_URL: 'http://localhost:7700',
        JWT_SECRET: 'your-jwt-secret-key-change-in-production',
        LOG_LEVEL: 'info',
        MSSQL_SERVER: 'localhost',
        MSSQL_PORT: 1433,
        MSSQL_DATABASE: 'EnterpriseEMS',
        MSSQL_USER: 'sa',
        MSSQL_PASSWORD: 'YourStrongPassword123!',
        MSSQL_ENCRYPT: 'false',
        MSSQL_TRUST_CERT: 'true'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 7500,
        BACKEND_PORT: 7500,
        FRONTEND_URL: 'http://localhost:7700',
        JWT_SECRET: 'your-production-jwt-secret-key',
        LOG_LEVEL: 'error',
        MSSQL_SERVER: 'localhost',
        MSSQL_PORT: 1433,
        MSSQL_DATABASE: 'EnterpriseEMS',
        MSSQL_USER: 'sa',
        MSSQL_PASSWORD: 'YourStrongPassword123!',
        MSSQL_ENCRYPT: 'false',
        MSSQL_TRUST_CERT: 'true'
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};

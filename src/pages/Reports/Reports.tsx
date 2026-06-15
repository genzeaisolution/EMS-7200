import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
} from '@mui/material';
import {
  Assessment,
  Download,
  Print,
  DateRange,
  TrendingUp,
  People,
  Assignment,
  SupportAgent,
  AttachMoney,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [branchFilter, setBranchFilter] = useState('all');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 65000, target: 60000 },
    { month: 'Feb', revenue: 72000, target: 65000 },
    { month: 'Mar', revenue: 68000, target: 70000 },
    { month: 'Apr', revenue: 78000, target: 75000 },
    { month: 'May', revenue: 85000, target: 80000 },
    { month: 'Jun', revenue: 92000, target: 85000 },
  ];

  const agentPerformanceData = [
    { name: 'Sarah Johnson', sales: 125000, target: 100000 },
    { name: 'Michael Brown', sales: 98000, target: 100000 },
    { name: 'Emily Davis', sales: 87000, target: 80000 },
    { name: 'John Smith', sales: 76000, target: 90000 },
    { name: 'Lisa Anderson', sales: 112000, target: 100000 },
  ];

  const ticketStatusData = [
    { name: 'Open', value: 45, color: '#1976d2' },
    { name: 'In Progress', value: 32, color: '#ff9800' },
    { name: 'Resolved', value: 28, color: '#4caf50' },
    { name: 'Closed', value: 15, color: '#9e9e9e' },
  ];

  const departmentStats = [
    { name: 'Sales', value: 35, color: '#4caf50' },
    { name: 'Marketing', value: 20, color: '#2196f3' },
    { name: 'Engineering', value: 25, color: '#ff9800' },
    { name: 'HR', value: 10, color: '#9c27b0' },
    { name: 'Finance', value: 10, color: '#f44336' },
  ];

  const reportCards = [
    {
      title: 'Total Revenue',
      value: '$460,000',
      change: '+12.5%',
      icon: <AttachMoney />,
      color: '#4caf50',
    },
    {
      title: 'Active Agents',
      value: '45',
      change: '+5',
      icon: <People />,
      color: '#2196f3',
    },
    {
      title: 'Open Tasks',
      value: '23',
      change: '-3',
      icon: <Assignment />,
      color: '#ff9800',
    },
    {
      title: 'Pending Tickets',
      value: '12',
      change: '+2',
      icon: <SupportAgent />,
      color: '#f44336',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Generate and view organizational reports and analytics
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="overview">Overview</MenuItem>
                <MenuItem value="sales">Sales Performance</MenuItem>
                <MenuItem value="agents">Agent Performance</MenuItem>
                <MenuItem value="employees">Employee Analytics</MenuItem>
                <MenuItem value="tickets">Ticket Analytics</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={(e) => setDateRange(e.target.value)}
              >
                <MenuItem value="7d">Last 7 Days</MenuItem>
                <MenuItem value="30d">Last 30 Days</MenuItem>
                <MenuItem value="90d">Last 90 Days</MenuItem>
                <MenuItem value="1y">Last Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Branch</InputLabel>
              <Select
                value={branchFilter}
                label="Branch"
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                <MenuItem value="all">All Branches</MenuItem>
                <MenuItem value="branch1">New York</MenuItem>
                <MenuItem value="branch2">Los Angeles</MenuItem>
                <MenuItem value="branch3">Chicago</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" startIcon={<Assessment />} size="small" fullWidth>
                Generate
              </Button>
              <Button variant="outlined" startIcon={<Download />} size="small">
                Export
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {reportCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box sx={{ color: card.color, fontSize: 32 }}>{card.icon}</Box>
                  <Chip
                    label={card.change}
                    color={card.change.startsWith('+') ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                <Typography variant="h5" component="div">
                  {card.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {card.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#1976d2" name="Revenue" />
                <Bar dataKey="target" fill="#e0e0e0" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ticket Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ticketStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Agent Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={agentPerformanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4caf50" name="Sales" />
                <Bar dataKey="target" fill="#e0e0e0" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Department Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Custom Reports</Typography>
          <Button variant="contained" startIcon={<Assessment />} size="small">
            Create Custom Report
          </Button>
        </Box>
        <Grid container spacing={2}>
          {[
            { name: 'Monthly Sales Report', description: 'Detailed sales analysis by month and region' },
            { name: 'Employee Performance', description: 'Individual and team performance metrics' },
            { name: 'Customer Satisfaction', description: 'NPS and customer feedback analysis' },
            { name: 'Financial Summary', description: 'Revenue, expenses, and profit margins' },
          ].map((report, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card variant="outlined" sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    {report.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {report.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Reports;

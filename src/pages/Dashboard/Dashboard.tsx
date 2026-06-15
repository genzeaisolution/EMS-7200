import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  People,
  Business,
  Assignment,
  SupportAgent,
  TrendingUp,
  AccessTime,
  CheckCircle,
  Pending,
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

const Dashboard: React.FC = () => {
  // Mock data - In real app, this would come from API
  const stats = {
    totalEmployees: 152,
    totalAgents: 45,
    activeTasks: 23,
    openTickets: 12,
    pendingApprovals: 8,
    completedTasks: 89,
  };

  const performanceData = [
    { name: 'Jan', agents: 4, tasks: 24 },
    { name: 'Feb', agents: 3, tasks: 13 },
    { name: 'Mar', agents: 2, tasks: 18 },
    { name: 'Apr', agents: 8, tasks: 39 },
    { name: 'May', agents: 1, tasks: 28 },
    { name: 'Jun', agents: 3, tasks: 39 },
  ];

  const taskStatusData = [
    { name: 'Completed', value: 89, color: '#4caf50' },
    { name: 'In Progress', value: 23, color: '#2196f3' },
    { name: 'Pending', value: 12, color: '#ff9800' },
  ];

  const recentActivities = [
    { id: 1, type: 'task', message: 'New task assigned to John Doe', time: '2 hours ago' },
    { id: 2, type: 'ticket', message: 'Ticket #1234 resolved by Jane Smith', time: '4 hours ago' },
    { id: 3, type: 'employee', message: 'New employee Michael Brown added', time: '6 hours ago' },
    { id: 4, type: 'agent', message: 'Agent Sarah Wilson completed target', time: '8 hours ago' },
  ];

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({
    title,
    value,
    icon,
    color,
  }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Welcome back! Here's what's happening in your organization today.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Employees" value={stats.totalEmployees} icon={<People />} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Agents" value={stats.totalAgents} icon={<SupportAgent />} color="#dc004e" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Tasks" value={stats.activeTasks} icon={<Assignment />} color="#ff9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Open Tickets" value={stats.openTickets} icon={<Business />} color="#4caf50" />
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="agents" fill="#1976d2" name="Agents" />
                <Bar dataKey="tasks" fill="#dc004e" name="Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Task Status Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ mt: 2 }}>
              {recentActivities.map((activity) => (
                <Box key={activity.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 2 }}>
                      {activity.type === 'task' && <Assignment color="primary" />}
                      {activity.type === 'ticket' && <SupportAgent color="success" />}
                      {activity.type === 'employee' && <People color="info" />}
                      {activity.type === 'agent' && <TrendingUp color="warning" />}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">{activity.message}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Pending Approvals */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Pending Approvals
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[1, 2, 3, 4].map((item) => (
                <Box key={item} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2">Leave Request #{item}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Submitted by Employee {item}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="contained" color="success">
                        Approve
                      </Button>
                      <Button size="small" variant="outlined" color="error">
                        Reject
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

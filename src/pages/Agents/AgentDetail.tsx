import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Divider,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  TrendingUp,
  Assignment,
  CalendarMonth,
  Payments,
  Badge,
} from '@mui/icons-material';
import { Agent } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const AgentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  // Mock data - In real app, this would come from API
  const agent: Agent & { FirstName: string; LastName: string; Email: string; Phone: string; BranchName: string; PerformanceData: any[] } = {
    AgentID: id || '1',
    UserID: 'user1',
    EmployeeID: 'emp1',
    OrganizationID: 'org1',
    BranchID: 'branch1',
    AgentCode: 'AGT001',
    AgentType: 'SalesAgent',
    ManagerID: null,
    Status: 'Active',
    LicenseNumber: 'LIC-001',
    LicenseExpiryDate: '2025-12-31',
    JoinDate: '2023-01-15',
    FirstName: 'Sarah',
    LastName: 'Johnson',
    Email: 'sarah.johnson@company.com',
    Phone: '+1-555-0123',
    BranchName: 'New York',
    PerformanceData: [
      { month: 'Jan', target: 10000, achieved: 8500 },
      { month: 'Feb', target: 10000, achieved: 9200 },
      { month: 'Mar', target: 10000, achieved: 7800 },
      { month: 'Apr', target: 10000, achieved: 10500 },
      { month: 'May', target: 10000, achieved: 11200 },
      { month: 'Jun', target: 10000, achieved: 9800 },
    ],
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2023-01-15T00:00:00Z',
    UpdatedAt: '2023-01-15T00:00:00Z',
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'On Leave':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/agents')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {agent.FirstName} {agent.LastName}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/agents/${id}/edit`)}>
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}>
                <Person sx={{ fontSize: 60 }} />
              </Avatar>
              <Typography variant="h6">
                {agent.FirstName} {agent.LastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {agent.AgentCode}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge color="primary" fontSize="small" />
                <Typography variant="body2">{agent.AgentType}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="primary" fontSize="small" />
                <Typography variant="body2">{agent.BranchName}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Chip
              label={agent.Status}
              color={getStatusColor(agent.Status) as any}
              sx={{ width: '100%' }}
            />
          </Paper>

          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    License
                  </Typography>
                  <Typography variant="body2">{agent.LicenseNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Expires
                  </Typography>
                  <Typography variant="body2">
                    {new Date(agent.LicenseExpiryDate!).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary">
                    Join Date
                  </Typography>
                  <Typography variant="body2">{new Date(agent.JoinDate!).toLocaleDateString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Performance" />
              <Tab label="Tasks" />
              <Tab label="Commissions" />
              <Tab label="Schedule" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Performance Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agent.PerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="target" fill="#e0e0e0" name="Target" />
                  <Bar dataKey="achieved" fill="#1976d2" name="Achieved" />
                </BarChart>
              </ResponsiveContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Assigned Tasks</Typography>
                <Button variant="contained" startIcon={<Assignment />}>
                  Assign Task
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                No tasks assigned yet.
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Commissions</Typography>
                <Button variant="contained" startIcon={<Payments />}>
                  Add Commission
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Commission history would be displayed here...
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Schedule</Typography>
                <Button variant="contained" startIcon={<CalendarMonth />}>
                  Add Schedule
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Schedule would be displayed here...
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentDetail;

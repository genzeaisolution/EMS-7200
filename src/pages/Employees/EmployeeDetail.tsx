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
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  Email,
  Phone,
  Business,
  Badge,
} from '@mui/icons-material';
import { Employee } from '../../types';

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

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  // Mock data - In real app, this would come from API
  const employee: Employee & { FirstName: string; LastName: string; Email: string; Phone: string; DepartmentName: string; BranchName: string } = {
    EmployeeID: id || '1',
    UserID: 'user1',
    OrganizationID: 'org1',
    BranchID: 'branch1',
    DepartmentID: 'dept1',
    TeamID: 'team1',
    DesignationID: 'des1',
    EmployeeCode: 'EMP001',
    ManagerID: null,
    EmploymentType: 'FullTime',
    EmploymentStatus: 'Active',
    JoinDate: '2023-01-15',
    FirstName: 'John',
    LastName: 'Doe',
    Email: 'john.doe@company.com',
    Phone: '+1-555-0123',
    DepartmentName: 'Engineering',
    BranchName: 'New York',
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
      case 'On Leave':
        return 'warning';
      case 'Inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/employees')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {employee.FirstName} {employee.LastName}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/employees/${id}/edit`)}>
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
                {employee.FirstName} {employee.LastName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {employee.EmployeeCode}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" fontSize="small" />
                <Typography variant="body2">{employee.Email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" fontSize="small" />
                <Typography variant="body2">{employee.Phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business color="primary" fontSize="small" />
                <Typography variant="body2">{employee.BranchName}</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Chip
              label={employee.EmploymentStatus}
              color={getStatusColor(employee.EmploymentStatus) as any}
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Overview" />
              <Tab label="Profile" />
              <Tab label="Documents" />
              <Tab label="History" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Employee Code
                  </Typography>
                  <Typography variant="body1">{employee.EmployeeCode}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Employment Type
                  </Typography>
                  <Typography variant="body1">{employee.EmploymentType}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Department
                  </Typography>
                  <Typography variant="body1">{employee.DepartmentName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Branch
                  </Typography>
                  <Typography variant="body1">{employee.BranchName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Join Date
                  </Typography>
                  <Typography variant="body1">{new Date(employee.JoinDate).toLocaleDateString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={employee.EmploymentStatus}
                    color={getStatusColor(employee.EmploymentStatus) as any}
                    size="small"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    First Name
                  </Typography>
                  <Typography variant="body1">{employee.FirstName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Last Name
                  </Typography>
                  <Typography variant="body1">{employee.LastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{employee.Email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{employee.Phone}</Typography>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Documents</Typography>
                <Button variant="contained" startIcon={<Badge />}>
                  Upload Document
                </Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                No documents uploaded yet.
              </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Employment History
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Employment history would be displayed here...
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetail;

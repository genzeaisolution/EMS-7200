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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Business,
  Email,
  Phone,
  LocationOn,
  People,
} from '@mui/icons-material';
import { Organization } from '../../types';

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

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);

  // Mock data - In real app, this would come from API
  const organization: Organization = {
    OrganizationID: id || '1',
    Name: 'Acme Corporation',
    Slug: 'acme-corp',
    LegalName: 'Acme Corporation Inc.',
    TaxID: '12-3456789',
    RegistrationNumber: 'REG-12345',
    Industry: 'Technology',
    LogoURL: '/logo.png',
    Website: 'https://acme.com',
    Email: 'contact@acme.com',
    Phone: '+1-555-0123',
    Address: '123 Business Ave',
    City: 'New York',
    State: 'NY',
    Country: 'USA',
    PostalCode: '10001',
    Timezone: 'America/New_York',
    Currency: 'USD',
    IsActive: true,
    IsDeleted: false,
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedAt: '2024-01-01T00:00:00Z',
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/organizations')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {organization.Name}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/organizations/${id}/edit`)}>
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Business sx={{ fontSize: 64, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6">{organization.Name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {organization.Slug}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" fontSize="small" />
                <Typography variant="body2">{organization.Email}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" fontSize="small" />
                <Typography variant="body2">{organization.Phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" fontSize="small" />
                <Typography variant="body2">
                  {organization.City}, {organization.Country}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Chip
              label={organization.IsActive ? 'Active' : 'Inactive'}
              color={organization.IsActive ? 'success' : 'default'}
              sx={{ width: '100%' }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Overview" />
              <Tab label="Branches" />
              <Tab label="Employees" />
              <Tab label="Settings" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Legal Name
                  </Typography>
                  <Typography variant="body1">{organization.LegalName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Tax ID
                  </Typography>
                  <Typography variant="body1">{organization.TaxID}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Industry
                  </Typography>
                  <Typography variant="body1">{organization.Industry}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Registration Number
                  </Typography>
                  <Typography variant="body1">{organization.RegistrationNumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{organization.Address}</Typography>
                  <Typography variant="body1">
                    {organization.City}, {organization.State} {organization.PostalCode}
                  </Typography>
                  <Typography variant="body1">{organization.Country}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Website
                  </Typography>
                  <Typography variant="body1">
                    <a href={organization.Website} target="_blank" rel="noopener noreferrer">
                      {organization.Website}
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Timezone
                  </Typography>
                  <Typography variant="body1">{organization.Timezone}</Typography>
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Head Office</TableCell>
                      <TableCell>Head Office</TableCell>
                      <TableCell>New York</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>West Coast Branch</TableCell>
                      <TableCell>Regional</TableCell>
                      <TableCell>Los Angeles</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Employees</Typography>
                <Button variant="contained" startIcon={<People />}>
                  Add Employee
                </Button>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee Code</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>EMP001</TableCell>
                      <TableCell>John Doe</TableCell>
                      <TableCell>Engineering</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>EMP002</TableCell>
                      <TableCell>Jane Smith</TableCell>
                      <TableCell>Marketing</TableCell>
                      <TableCell>
                        <Chip label="Active" color="success" size="small" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Organization Settings
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Settings configuration would go here...
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganizationDetail;

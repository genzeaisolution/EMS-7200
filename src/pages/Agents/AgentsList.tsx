import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  Person,
  TrendingUp,
} from '@mui/icons-material';
import { Agent } from '../../types';

const AgentsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Mock data - In real app, this would come from API
  const agents: (Agent & { FirstName: string; LastName: string; Performance: number; Target: number; Achieved: number })[] = [
    {
      AgentID: '1',
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
      Performance: 85,
      Target: 100000,
      Achieved: 85000,
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-01-15T00:00:00Z',
      UpdatedAt: '2023-01-15T00:00:00Z',
    },
    {
      AgentID: '2',
      UserID: 'user2',
      EmployeeID: 'emp2',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      AgentCode: 'AGT002',
      AgentType: 'SalesAgent',
      ManagerID: 'user1',
      Status: 'Active',
      LicenseNumber: 'LIC-002',
      LicenseExpiryDate: '2025-06-30',
      JoinDate: '2023-02-20',
      FirstName: 'Michael',
      LastName: 'Brown',
      Performance: 92,
      Target: 120000,
      Achieved: 110400,
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-02-20T00:00:00Z',
      UpdatedAt: '2023-02-20T00:00:00Z',
    },
    {
      AgentID: '3',
      UserID: 'user3',
      EmployeeID: 'emp3',
      OrganizationID: 'org1',
      BranchID: 'branch2',
      AgentCode: 'AGT003',
      AgentType: 'ServiceAgent',
      ManagerID: null,
      Status: 'Inactive',
      LicenseNumber: 'LIC-003',
      LicenseExpiryDate: '2024-12-31',
      JoinDate: '2023-03-10',
      FirstName: 'Emily',
      LastName: 'Davis',
      Performance: 78,
      Target: 80000,
      Achieved: 62400,
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-03-10T00:00:00Z',
      UpdatedAt: '2023-03-10T00:00:00Z',
    },
  ];

  const filteredAgents = agents.filter(
    (agent) =>
      `${agent.FirstName} ${agent.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.AgentCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => {
    navigate(`/agents/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/agents/${id}/edit`);
  };

  const handleDelete = (agent: Agent) => {
    setSelectedAgent(agent);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting agent:', selectedAgent?.AgentID);
    setDeleteDialogOpen(false);
    setSelectedAgent(null);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Agents</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/agents/create')}>
          Add Agent
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search agents..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Agent</TableCell>
              <TableCell>Agent Code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.AgentID} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {agent.FirstName} {agent.LastName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Joined {new Date(agent.JoinDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{agent.AgentCode}</TableCell>
                <TableCell>{agent.AgentType}</TableCell>
                <TableCell>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption">{agent.Performance}%</Typography>
                      <Typography variant="caption">
                        ${agent.Achieved.toLocaleString()} / ${agent.Target.toLocaleString()}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={agent.Performance}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={agent.Status}
                    color={getStatusColor(agent.Status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(agent.AgentID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(agent.AgentID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(agent)} size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this agent? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentsList;

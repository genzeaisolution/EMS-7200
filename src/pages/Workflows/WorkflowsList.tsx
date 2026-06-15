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
  Tab,
  Tabs,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  AccountTree,
  CheckCircle,
  Pending,
  Warning,
} from '@mui/icons-material';
import { Workflow, WorkflowApproval } from '../../types';

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const WorkflowsList: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);

  // Mock data - In real app, this would come from API
  const workflows: Workflow[] = [
    {
      WorkflowID: '1',
      OrganizationID: 'org1',
      Name: 'Leave Request Approval',
      Code: 'leave_approval',
      Description: 'Multi-level approval process for employee leave requests',
      EntityType: 'LeaveRequest',
      TriggerType: 'OnCreate',
      IsActive: true,
      IsDeleted: false,
      CreatedBy: 'user1',
      CreatedAt: '2024-01-01T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-01-01T00:00:00Z',
    },
    {
      WorkflowID: '2',
      OrganizationID: 'org1',
      Name: 'Expense Reimbursement',
      Code: 'expense_approval',
      Description: 'Approval process for expense reimbursement requests',
      EntityType: 'Expense',
      TriggerType: 'OnCreate',
      IsActive: true,
      IsDeleted: false,
      CreatedBy: 'user2',
      CreatedAt: '2024-01-15T00:00:00Z',
      UpdatedBy: 'user2',
      UpdatedAt: '2024-01-15T00:00:00Z',
    },
    {
      WorkflowID: '3',
      OrganizationID: 'org1',
      Name: 'Purchase Order Approval',
      Code: 'po_approval',
      Description: 'Approval workflow for purchase orders above certain thresholds',
      EntityType: 'PurchaseOrder',
      TriggerType: 'OnCreate',
      IsActive: true,
      IsDeleted: false,
      CreatedBy: 'user3',
      CreatedAt: '2024-01-20T00:00:00Z',
      UpdatedBy: 'user3',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
  ];

  const pendingApprovals: (WorkflowApproval & { RequesterName: string; EntityTitle: string })[] = [
    {
      ApprovalID: '1',
      WorkflowID: '1',
      StageID: 'stage1',
      OrganizationID: 'org1',
      EntityID: 'entity1',
      EntityType: 'LeaveRequest',
      RequestedBy: 'user1',
      ApproverID: 'user2',
      Status: 'Pending',
      Decision: null,
      DecisionNote: null,
      DecidedAt: null,
      DueAt: '2024-02-15T00:00:00Z',
      IsEscalated: false,
      EscalatedAt: null,
      CreatedBy: 'user1',
      CreatedAt: '2024-02-10T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-02-10T00:00:00Z',
      RequesterName: 'John Doe',
      EntityTitle: 'Annual Leave - 5 days',
    },
    {
      ApprovalID: '2',
      WorkflowID: '2',
      StageID: 'stage2',
      OrganizationID: 'org1',
      EntityID: 'entity2',
      EntityType: 'Expense',
      RequestedBy: 'user3',
      ApproverID: 'user2',
      Status: 'Pending',
      Decision: null,
      DecisionNote: null,
      DecidedAt: null,
      DueAt: '2024-02-12T00:00:00Z',
      IsEscalated: true,
      EscalatedAt: '2024-02-13T00:00:00Z',
      CreatedBy: 'user3',
      CreatedAt: '2024-02-08T00:00:00Z',
      UpdatedBy: 'user3',
      UpdatedAt: '2024-02-08T00:00:00Z',
      RequesterName: 'Emily Davis',
      EntityTitle: 'Client Dinner - $250',
    },
  ];

  const filteredWorkflows = workflows.filter(
    (workflow) =>
      workflow.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.Code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => {
    navigate(`/workflows/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/workflows/${id}/edit`);
  };

  const handleDelete = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting workflow:', selectedWorkflow?.WorkflowID);
    setDeleteDialogOpen(false);
    setSelectedWorkflow(null);
  };

  const handleApproval = (approvalId: string, decision: string) => {
    console.log('Processing approval:', approvalId, decision);
    // In real app, call API to process approval
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Workflows & Approvals</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/workflows/create')}>
          Create Workflow
        </Button>
      </Box>

      <Paper>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} indicatorColor="primary" textColor="primary">
          <Tab label="Workflows" />
          <Tab label={`Pending Approvals (${pendingApprovals.length})`} />
          <Tab label="My Approvals" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Paper sx={{ mb: 3, p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Search sx={{ color: 'text.secondary' }} />
              <TextField
                placeholder="Search workflows..."
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
                  <TableCell>Workflow</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Entity Type</TableCell>
                  <TableCell>Trigger</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWorkflows.map((workflow) => (
                  <TableRow key={workflow.WorkflowID} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <AccountTree color="primary" />
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {workflow.Name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {workflow.Description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={workflow.Code} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{workflow.EntityType}</TableCell>
                    <TableCell>{workflow.TriggerType}</TableCell>
                    <TableCell>
                      <Chip
                        label={workflow.IsActive ? 'Active' : 'Inactive'}
                        color={workflow.IsActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleView(workflow.WorkflowID)} size="small">
                        <Visibility fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(workflow.WorkflowID)} size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(workflow)} size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {pendingApprovals.map((approval) => (
              <Grid item xs={12} md={6} key={approval.ApprovalID}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {approval.EntityTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Requested by {approval.RequesterName}
                        </Typography>
                      </Box>
                      {approval.IsEscalated && (
                        <Chip label="Escalated" color="warning" size="small" icon={<Warning />} />
                      )}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="textSecondary">
                        Due Date
                      </Typography>
                      <Typography variant="body2">
                        {approval.DueAt ? new Date(approval.DueAt).toLocaleDateString() : 'No due date'}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckCircle />}
                        onClick={() => handleApproval(approval.ApprovalID, 'approve')}
                        size="small"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Pending />}
                        onClick={() => handleApproval(approval.ApprovalID, 'reject')}
                        size="small"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/workflows/approvals/${approval.ApprovalID}`)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" color="textSecondary" align="center" sx={{ py: 4 }}>
            Your approval history will be displayed here...
          </Typography>
        </TabPanel>
      </Paper>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedWorkflow?.Name}"? This action cannot be undone.
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

export default WorkflowsList;

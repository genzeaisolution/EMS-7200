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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  SupportAgent,
  Person,
  AccessTime,
} from '@mui/icons-material';
import { Ticket } from '../../types';

const TicketsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  // Mock data - In real app, this would come from API
  const tickets: (Ticket & { RequesterName: string; AssigneeName: string; StatusName: string; CategoryName: string })[] = [
    {
      TicketID: '1',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      TicketNumber: 'TKT-001',
      Title: 'Login issue with mobile app',
      Description: 'Users unable to login on mobile devices',
      StatusID: 'status1',
      CategoryID: 'cat1',
      Priority: 'High',
      RequesterID: 'user1',
      AssignedToID: 'user2',
      DueDate: '2024-02-15T00:00:00Z',
      ResolvedAt: null,
      ClosedAt: null,
      SLABreached: false,
      Tags: 'mobile, login',
      IsDeleted: false,
      RequesterName: 'John Doe',
      AssigneeName: 'Jane Smith',
      StatusName: 'Open',
      CategoryName: 'Technical',
      CreatedBy: 'user1',
      CreatedAt: '2024-01-15T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-01-15T00:00:00Z',
    },
    {
      TicketID: '2',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      TicketNumber: 'TKT-002',
      Title: 'Payment gateway integration',
      Description: 'Need to integrate new payment gateway',
      StatusID: 'status2',
      CategoryID: 'cat2',
      Priority: 'Medium',
      RequesterID: 'user3',
      AssignedToID: null,
      DueDate: '2024-02-20T00:00:00Z',
      ResolvedAt: null,
      ClosedAt: null,
      SLABreached: false,
      Tags: 'payment, integration',
      IsDeleted: false,
      RequesterName: 'Michael Johnson',
      AssigneeName: 'Unassigned',
      StatusName: 'In Progress',
      CategoryName: 'Feature Request',
      CreatedBy: 'user3',
      CreatedAt: '2024-01-20T00:00:00Z',
      UpdatedBy: 'user3',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
    {
      TicketID: '3',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      TicketNumber: 'TKT-003',
      Title: 'Email notification not working',
      Description: 'Email notifications for new tickets not being sent',
      StatusID: 'status3',
      CategoryID: 'cat1',
      Priority: 'Critical',
      RequesterID: 'user4',
      AssignedToID: 'user2',
      DueDate: '2024-01-25T00:00:00Z',
      ResolvedAt: '2024-01-24T00:00:00Z',
      ClosedAt: '2024-01-24T00:00:00Z',
      SLABreached: false,
      Tags: 'email, notification',
      IsDeleted: false,
      RequesterName: 'Emily Davis',
      AssigneeName: 'Jane Smith',
      StatusName: 'Resolved',
      CategoryName: 'Technical',
      CreatedBy: 'user4',
      CreatedAt: '2024-01-22T00:00:00Z',
      UpdatedBy: 'user4',
      UpdatedAt: '2024-01-24T00:00:00Z',
    },
  ];

  const filteredTickets = tickets.filter(
    (ticket) =>
      (ticket.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.TicketNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || ticket.StatusName === statusFilter) &&
      (priorityFilter === 'all' || ticket.Priority === priorityFilter)
  );

  const handleView = (id: string) => {
    navigate(`/tickets/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/tickets/${id}/edit`);
  };

  const handleDelete = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting ticket:', selectedTicket?.TicketID);
    setDeleteDialogOpen(false);
    setSelectedTicket(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'info';
      case 'In Progress':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'Closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Tickets</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/tickets/create')}>
          Create Ticket
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search tickets..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400, minWidth: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="all">All Priority</MenuItem>
              <MenuItem value="Critical">Critical</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket</TableCell>
              <TableCell>Requester</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.TicketID} hover>
                <TableCell>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {ticket.TicketNumber} - {ticket.Title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {ticket.Tags}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person fontSize="small" />
                    <Typography variant="body2">{ticket.RequesterName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SupportAgent fontSize="small" />
                    <Typography variant="body2">{ticket.AssigneeName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{ticket.CategoryName}</TableCell>
                <TableCell>
                  <Chip
                    label={ticket.StatusName}
                    color={getStatusColor(ticket.StatusName) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.Priority}
                    color={getPriorityColor(ticket.Priority) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      {ticket.DueDate ? new Date(ticket.DueDate).toLocaleDateString() : '-'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(ticket.TicketID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(ticket.TicketID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(ticket)} size="small" color="error">
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
          Are you sure you want to delete this ticket? This action cannot be undone.
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

export default TicketsList;

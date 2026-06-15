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
  Assignment,
  Person,
} from '@mui/icons-material';
import { Task } from '../../types';

const TasksList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock data - In real app, this would come from API
  const tasks: (Task & { AssignedToName: string; StatusName: string; PriorityName: string })[] = [
    {
      TaskID: '1',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      ParentTaskID: null,
      Title: 'Implement user authentication',
      Description: 'Implement JWT-based authentication system',
      StatusID: 'status1',
      PriorityID: 'priority1',
      AssignedToUserID: 'user1',
      AssignedToTeamID: 'team1',
      DueDate: '2024-02-15T00:00:00Z',
      StartDate: '2024-01-15T00:00:00Z',
      CompletedAt: null,
      EstimatedHours: 40,
      ActualHours: 32,
      Tags: 'authentication, security',
      IsArchived: false,
      IsDeleted: false,
      AssignedToName: 'John Doe',
      StatusName: 'In Progress',
      PriorityName: 'High',
      CreatedBy: 'user1',
      CreatedAt: '2024-01-15T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
    {
      TaskID: '2',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      ParentTaskID: null,
      Title: 'Design database schema',
      Description: 'Create database schema for the new module',
      StatusID: 'status2',
      PriorityID: 'priority2',
      AssignedToUserID: 'user2',
      AssignedToTeamID: 'team2',
      DueDate: '2024-02-20T00:00:00Z',
      StartDate: '2024-01-20T00:00:00Z',
      CompletedAt: null,
      EstimatedHours: 24,
      ActualHours: 20,
      Tags: 'database, design',
      IsArchived: false,
      IsDeleted: false,
      AssignedToName: 'Jane Smith',
      StatusName: 'Pending',
      PriorityName: 'Medium',
      CreatedBy: 'user2',
      CreatedAt: '2024-01-20T00:00:00Z',
      UpdatedBy: 'user2',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
    {
      TaskID: '3',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      ParentTaskID: '1',
      Title: 'Write unit tests',
      Description: 'Write comprehensive unit tests for authentication module',
      StatusID: 'status3',
      PriorityID: 'priority1',
      AssignedToUserID: 'user1',
      AssignedToTeamID: 'team1',
      DueDate: '2024-02-10T00:00:00Z',
      StartDate: '2024-01-25T00:00:00Z',
      CompletedAt: '2024-02-08T00:00:00Z',
      EstimatedHours: 16,
      ActualHours: 14,
      Tags: 'testing, quality',
      IsArchived: false,
      IsDeleted: false,
      AssignedToName: 'John Doe',
      StatusName: 'Completed',
      PriorityName: 'High',
      CreatedBy: 'user1',
      CreatedAt: '2024-01-25T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-02-08T00:00:00Z',
    },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      (task.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.Tags?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === 'all' || task.StatusName === statusFilter)
  );

  const handleView = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/tasks/${id}/edit`);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting task:', selectedTask?.TaskID);
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
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
        <Typography variant="h4">Tasks</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/tasks/create')}>
          Add Task
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.TaskID} hover>
                <TableCell>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {task.Title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {task.Tags}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Person fontSize="small" />
                    <Typography variant="body2">{task.AssignedToName}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.StatusName}
                    color={getStatusColor(task.StatusName) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.PriorityName}
                    color={getPriorityColor(task.PriorityName) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {task.DueDate ? new Date(task.DueDate).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(task.TaskID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(task.TaskID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(task)} size="small" color="error">
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
          Are you sure you want to delete this task? This action cannot be undone.
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

export default TasksList;

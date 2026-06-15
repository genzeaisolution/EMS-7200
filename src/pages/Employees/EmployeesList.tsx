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
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  Person,
} from '@mui/icons-material';
import { Employee } from '../../types';

const EmployeesList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Mock data - In real app, this would come from API
  const employees: (Employee & { FirstName: string; LastName: string })[] = [
    {
      EmployeeID: '1',
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
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-01-15T00:00:00Z',
      UpdatedAt: '2023-01-15T00:00:00Z',
    },
    {
      EmployeeID: '2',
      UserID: 'user2',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      DepartmentID: 'dept2',
      TeamID: 'team2',
      DesignationID: 'des2',
      EmployeeCode: 'EMP002',
      ManagerID: null,
      EmploymentType: 'FullTime',
      EmploymentStatus: 'Active',
      JoinDate: '2023-02-20',
      FirstName: 'Jane',
      LastName: 'Smith',
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-02-20T00:00:00Z',
      UpdatedAt: '2023-02-20T00:00:00Z',
    },
    {
      EmployeeID: '3',
      UserID: 'user3',
      OrganizationID: 'org1',
      BranchID: 'branch1',
      DepartmentID: 'dept1',
      TeamID: 'team1',
      DesignationID: 'des1',
      EmployeeCode: 'EMP003',
      ManagerID: 'user1',
      EmploymentType: 'Contract',
      EmploymentStatus: 'On Leave',
      JoinDate: '2023-03-10',
      FirstName: 'Michael',
      LastName: 'Johnson',
      IsActive: true,
      IsDeleted: false,
      CreatedAt: '2023-03-10T00:00:00Z',
      UpdatedAt: '2023-03-10T00:00:00Z',
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      `${emp.FirstName} ${emp.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.EmployeeCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => {
    navigate(`/employees/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/employees/${id}/edit`);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting employee:', selectedEmployee?.EmployeeID);
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Employees</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/employees/create')}>
          Add Employee
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search employees..."
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
              <TableCell>Employee</TableCell>
              <TableCell>Employee Code</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Employment Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees.map((emp) => (
              <TableRow key={emp.EmployeeID} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {emp.FirstName} {emp.LastName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Joined {new Date(emp.JoinDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{emp.EmployeeCode}</TableCell>
                <TableCell>Engineering</TableCell>
                <TableCell>{emp.EmploymentType}</TableCell>
                <TableCell>
                  <Chip
                    label={emp.EmploymentStatus}
                    color={getStatusColor(emp.EmploymentStatus) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(emp.EmployeeID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(emp.EmployeeID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(emp)} size="small" color="error">
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
          Are you sure you want to delete this employee? This action cannot be undone.
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

export default EmployeesList;

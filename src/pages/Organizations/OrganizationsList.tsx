import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
} from '@mui/icons-material';
import { Organization } from '../../types';
import { organizationService } from '../../services';

const OrganizationsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrganizations();
  }, [searchTerm]);

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      const response = await organizationService.getOrganizations({ search: searchTerm });
      setOrganizations(response.data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id: string) => {
    navigate(`/organizations/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/organizations/${id}/edit`);
  };

  const handleDelete = (organization: Organization) => {
    setSelectedOrganization(organization);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedOrganization) {
      try {
        await organizationService.deleteOrganization(selectedOrganization.OrganizationID);
        await loadOrganizations();
        setDeleteDialogOpen(false);
        setSelectedOrganization(null);
      } catch (err: any) {
        setError(err.message || 'Failed to delete organization');
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Organizations</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/organizations/create')}>
          Add Organization
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search organizations..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.OrganizationID} hover>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {org.Name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {org.Slug}
                  </Typography>
                </TableCell>
                <TableCell>{org.Email}</TableCell>
                <TableCell>{org.Phone}</TableCell>
                <TableCell>{`${org.City}, ${org.Country}`}</TableCell>
                <TableCell>
                  <Chip
                    label={org.IsActive ? 'Active' : 'Inactive'}
                    color={org.IsActive ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleView(org.OrganizationID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(org.OrganizationID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(org)} size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}


      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedOrganization?.Name}? This action cannot be undone.
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

export default OrganizationsList;

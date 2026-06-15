import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Add,
  Search,
  Visibility,
  Edit,
  Delete,
  Download,
  Share,
  Folder,
  Description,
  PictureAsPdf,
  Image,
  TableChart,
} from '@mui/icons-material';
import { Document } from '../../types';

const DocumentsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock data - In real app, this would come from API
  const documents: Document[] = [
    {
      DocumentID: '1',
      OrganizationID: 'org1',
      FolderID: 'folder1',
      Title: 'Employee Handbook 2024',
      Description: 'Company policies and procedures for employees',
      DocumentType: 'PDF',
      FileName: 'employee_handbook_2024.pdf',
      FileURL: '/documents/employee_handbook_2024.pdf',
      FileSize: 2457600,
      MimeType: 'application/pdf',
      Version: 1,
      Status: 'Published',
      Tags: 'policy, handbook',
      IsPublic: true,
      IsDeleted: false,
      CreatedBy: 'user1',
      CreatedAt: '2024-01-01T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-01-01T00:00:00Z',
    },
    {
      DocumentID: '2',
      OrganizationID: 'org1',
      FolderID: 'folder1',
      Title: 'Sales Training Materials',
      Description: 'Training materials for sales team',
      DocumentType: 'PDF',
      FileName: 'sales_training.pdf',
      FileURL: '/documents/sales_training.pdf',
      FileSize: 5242880,
      MimeType: 'application/pdf',
      Version: 2,
      Status: 'Published',
      Tags: 'training, sales',
      IsPublic: false,
      IsDeleted: false,
      CreatedBy: 'user2',
      CreatedAt: '2024-01-15T00:00:00Z',
      UpdatedBy: 'user2',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
    {
      DocumentID: '3',
      OrganizationID: 'org1',
      FolderID: 'folder2',
      Title: 'Q4 2023 Financial Report',
      Description: 'Quarterly financial report for Q4 2023',
      DocumentType: 'XLSX',
      FileName: 'q4_2023_financial_report.xlsx',
      FileURL: '/documents/q4_2023_financial_report.xlsx',
      FileSize: 1048576,
      MimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Version: 1,
      Status: 'Draft',
      Tags: 'finance, report',
      IsPublic: false,
      IsDeleted: false,
      CreatedBy: 'user3',
      CreatedAt: '2024-01-20T00:00:00Z',
      UpdatedBy: 'user3',
      UpdatedAt: '2024-01-20T00:00:00Z',
    },
    {
      DocumentID: '4',
      OrganizationID: 'org1',
      FolderID: null,
      Title: 'Company Logo',
      Description: 'Official company logo in high resolution',
      DocumentType: 'PNG',
      FileName: 'company_logo.png',
      FileURL: '/documents/company_logo.png',
      FileSize: 524288,
      MimeType: 'image/png',
      Version: 1,
      Status: 'Published',
      Tags: 'branding, logo',
      IsPublic: true,
      IsDeleted: false,
      CreatedBy: 'user1',
      CreatedAt: '2024-01-01T00:00:00Z',
      UpdatedBy: 'user1',
      UpdatedAt: '2024-01-01T00:00:00Z',
    },
  ];

  const folders = [
    { id: 'folder1', name: 'HR Documents', documentCount: 12 },
    { id: 'folder2', name: 'Finance', documentCount: 8 },
    { id: 'folder3', name: 'Marketing', documentCount: 15 },
    { id: 'folder4', name: 'Technical', documentCount: 23 },
  ];

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.Tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (id: string) => {
    navigate(`/documents/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/documents/${id}/edit`);
  };

  const handleDelete = (document: Document) => {
    setSelectedDocument(document);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In real app, call API to delete
    console.log('Deleting document:', selectedDocument?.DocumentID);
    setDeleteDialogOpen(false);
    setSelectedDocument(null);
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return <PictureAsPdf />;
    if (mimeType.includes('image')) return <Image />;
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) return <TableChart />;
    return <Description />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Documents</Typography>
        <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/documents/create')}>
          Upload Document
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Search sx={{ color: 'text.secondary' }} />
          <TextField
            placeholder="Search documents..."
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ maxWidth: 400, minWidth: 250 }}
          />
        </Box>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Folders
        </Typography>
        <Grid container spacing={2}>
          {folders.map((folder) => (
            <Grid item xs={12} sm={6} md={3} key={folder.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
                onClick={() => navigate(`/documents/folder/${folder.id}`)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Folder sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="subtitle1">{folder.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {folder.documentCount} documents
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography variant="h6" gutterBottom>
        All Documents
      </Typography>
      <Grid container spacing={2}>
        {filteredDocuments.map((doc) => (
          <Grid item xs={12} sm={6} md={4} key={doc.DocumentID}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getFileIcon(doc.MimeType || '')}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {doc.Title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      v{doc.Version}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  {doc.Description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {doc.Tags?.split(', ').map((tag, index) => (
                    <Chip key={index} label={tag} size="small" variant="outlined" />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="textSecondary">
                    {formatFileSize(doc.FileSize || 0)}
                  </Typography>
                  <Chip
                    label={doc.Status}
                    size="small"
                    color={doc.Status === 'Published' ? 'success' : 'default'}
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Box>
                  <IconButton onClick={() => handleView(doc.DocumentID)} size="small">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(doc.DocumentID)} size="small">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(doc)} size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton size="small">
                    <Download fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <Share fontSize="small" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{selectedDocument?.Title}"? This action cannot be undone.
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

export default DocumentsList;

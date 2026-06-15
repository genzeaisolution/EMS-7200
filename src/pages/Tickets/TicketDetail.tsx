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
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  SupportAgent,
  AccessTime,
  ExpandMore,
  AttachFile,
  Comment,
} from '@mui/icons-material';
import { Ticket } from '../../types';

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

const TicketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [reply, setReply] = React.useState('');

  // Mock data - In real app, this would come from API
  const ticket: Ticket & { RequesterName: string; AssigneeName: string; StatusName: string; CategoryName: string } = {
    TicketID: id || '1',
    OrganizationID: 'org1',
    BranchID: 'branch1',
    TicketNumber: 'TKT-001',
    Title: 'Login issue with mobile app',
    Description: 'Users are experiencing issues logging in to the mobile application. The error occurs when they enter their credentials and tap the login button. The error message reads "Authentication failed". This issue started happening after the latest app update.',
    StatusID: 'status1',
    CategoryID: 'cat1',
    Priority: 'High',
    RequesterID: 'user1',
    AssignedToID: 'user2',
    DueDate: '2024-02-15T00:00:00Z',
    ResolvedAt: null,
    ClosedAt: null,
    SLABreached: false,
    Tags: 'mobile, login, authentication',
    IsDeleted: false,
    RequesterName: 'John Doe',
    AssigneeName: 'Jane Smith',
    StatusName: 'Open',
    CategoryName: 'Technical',
    CreatedBy: 'user1',
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedBy: 'user1',
    UpdatedAt: '2024-01-15T00:00:00Z',
  };

  const replies = [
    {
      id: 1,
      author: 'Jane Smith',
      content: 'I\'ve started investigating this issue. It seems to be related to the token expiration logic in the mobile app. I\'ll need to review the authentication flow.',
      isInternal: false,
      time: '2 hours ago',
    },
    {
      id: 2,
      author: 'John Doe',
      content: 'Thanks for looking into this. Please let me know if you need any additional information from the users.',
      isInternal: false,
      time: '1 hour ago',
    },
  ];

  const attachments = [
    { id: 1, name: 'error_log.txt', size: '2.5 KB', uploadedBy: 'John Doe', time: '2 hours ago' },
    { id: 2, name: 'screenshot.png', size: '156 KB', uploadedBy: 'John Doe', time: '2 hours ago' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddReply = () => {
    if (reply.trim()) {
      console.log('Adding reply:', reply);
      setReply('');
    }
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/tickets')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {ticket.TicketNumber} - {ticket.Title}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/tickets/${id}/edit`)}>
          Edit
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {ticket.Description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {ticket.Tags?.split(', ').map((tag, index) => (
                  <Chip key={index} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          </Paper>

          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Replies" />
              <Tab label="Attachments" />
              <Tab label="Activity" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddReply} disabled={!reply.trim()}>
                  Send Reply
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {replies.map((reply) => (
                <Accordion key={reply.id} sx={{ mb: 2 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                      <Avatar>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {reply.author}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {reply.time}
                        </Typography>
                      </Box>
                      {reply.isInternal && (
                        <Chip label="Internal" size="small" color="warning" variant="outlined" />
                      )}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                      {reply.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Attachments</Typography>
                <Button variant="contained" startIcon={<AttachFile />}>
                  Upload File
                </Button>
              </Box>
              {attachments.map((attachment) => (
                <Box key={attachment.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
                  <AttachFile color="primary" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {attachment.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {attachment.size} • Uploaded by {attachment.uploadedBy} • {attachment.time}
                    </Typography>
                  </Box>
                  <Button size="small">Download</Button>
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Activity History
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Activity history would be displayed here...
              </Typography>
            </TabPanel>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ticket Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Status
                  </Typography>
                  <Chip
                    label={ticket.StatusName}
                    color={getStatusColor(ticket.StatusName) as any}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    Priority
                  </Typography>
                  <Chip
                    label={ticket.Priority}
                    color={getPriorityColor(ticket.Priority) as any}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" fontSize="small" />
                  <Typography variant="body2">Requester: {ticket.RequesterName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SupportAgent color="primary" fontSize="small" />
                  <Typography variant="body2">Assigned to: {ticket.AssigneeName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime color="primary" fontSize="small" />
                  <Typography variant="body2">
                    Due: {ticket.DueDate ? new Date(ticket.DueDate).toLocaleDateString() : 'No due date'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" fullWidth size="small">
                  Assign to Me
                </Button>
                <Button variant="outlined" fullWidth size="small">
                  Add Note
                </Button>
                <Button variant="outlined" fullWidth size="small">
                  Change Status
                </Button>
                <Button variant="outlined" fullWidth size="small" color="success">
                  Mark as Resolved
                </Button>
                <Button variant="outlined" fullWidth size="small" color="error">
                  Close Ticket
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketDetail;

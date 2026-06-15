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
  Box as MuiBox,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Person,
  AccessTime,
  Flag,
  Comment,
} from '@mui/icons-material';
import { Task } from '../../types';

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

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [comment, setComment] = React.useState('');

  // Mock data - In real app, this would come from API
  const task: Task & { AssignedToName: string; StatusName: string; PriorityName: string; CreatorName: string } = {
    TaskID: id || '1',
    OrganizationID: 'org1',
    BranchID: 'branch1',
    ParentTaskID: null,
    Title: 'Implement user authentication',
    Description: 'Implement JWT-based authentication system with secure token generation and validation. Include features like refresh tokens, password reset, and email verification.',
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
    CreatorName: 'Jane Smith',
    CreatedBy: 'user1',
    CreatedAt: '2024-01-15T00:00:00Z',
    UpdatedBy: 'user1',
    UpdatedAt: '2024-01-20T00:00:00Z',
  };

  const comments = [
    { id: 1, author: 'Jane Smith', text: 'Please focus on security best practices', time: '2 days ago' },
    { id: 2, author: 'John Doe', text: 'Will do. I\'m using bcrypt for password hashing', time: '1 day ago' },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log('Adding comment:', comment);
      setComment('');
    }
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
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/tasks')} sx={{ mr: 1 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {task.Title}
        </Typography>
        <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/tasks/${id}/edit`)}>
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
              {task.Description}
            </Typography>
          </Paper>

          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label="Comments" />
              <Tab label="Attachments" />
              <Tab label="Activity" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddComment} disabled={!comment.trim()}>
                  Add Comment
                </Button>
              </Box>
              <Divider sx={{ mb: 3 }} />
              {comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar>
                      <Person />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {comment.author}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {comment.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 7 }}>
                    {comment.text}
                  </Typography>
                </Box>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Attachments</Typography>
                <Button variant="contained">Upload File</Button>
              </Box>
              <Typography variant="body2" color="textSecondary">
                No attachments yet.
              </Typography>
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
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Chip
                label={task.StatusName}
                color={getStatusColor(task.StatusName) as any}
                sx={{ mb: 2 }}
              />
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Priority
              </Typography>
              <Chip
                label={task.PriorityName}
                color={getPriorityColor(task.PriorityName) as any}
              />
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person color="primary" fontSize="small" />
                  <Typography variant="body2">Assigned to {task.AssignedToName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime color="primary" fontSize="small" />
                  <Typography variant="body2">
                    Due {task.DueDate ? new Date(task.DueDate).toLocaleDateString() : 'No due date'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Flag color="primary" fontSize="small" />
                  <Typography variant="body2">
                    {task.EstimatedHours}h estimated / {task.ActualHours}h actual
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {task.Tags?.split(', ').map((tag, index) => (
                  <Chip key={index} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 3, mb: 1 }}>
                Created by
              </Typography>
              <Typography variant="body2">{task.CreatorName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(task.CreatedAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetail;

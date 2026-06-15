import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Tab,
  Tabs,
  Avatar,
  IconButton,
  Alert,
  MenuItem,
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Palette,
  Language,
  Save,
  Edit,
} from '@mui/icons-material';
import { useAuthStore } from '../../store/authStore';

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

const Settings: React.FC = () => {
  const { user } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: user?.FirstName || 'John',
    lastName: user?.LastName || 'Doe',
    email: user?.Email || 'john.doe@example.com',
    phone: '+1-555-0123',
    bio: 'Software engineer with 5 years of experience',
    timezone: 'America/New_York',
    language: 'en',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    ticketUpdates: true,
    weeklyDigest: false,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: true,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    darkMode: false,
    compactMode: false,
    fontSize: 'medium',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    // In real app, call API to save settings
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications({ ...notifications, [field]: !notifications[field as keyof typeof notifications] });
  };

  const handleSecurityToggle = (field: string) => {
    setSecurity({ ...security, [field]: !security[field as keyof typeof security] });
  };

  const handleAppearanceToggle = (field: string) => {
    setAppearance({ ...appearance, [field]: !appearance[field as keyof typeof appearance] });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Manage your account settings and preferences
      </Typography>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper>
        <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Profile" icon={<Person />} />
          <Tab label="Security" icon={<Security />} />
          <Tab label="Notifications" icon={<Notifications />} />
          <Tab label="Appearance" icon={<Palette />} />
          <Tab label="Language" icon={<Language />} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}>
                    <Person sx={{ fontSize: 60 }} />
                  </Avatar>
                  <IconButton size="small" color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" display="block" color="textSecondary">
                    Change avatar
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      fullWidth
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      fullWidth
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={profile.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone"
                      fullWidth
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      fullWidth
                      multiline
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => handleProfileChange('bio', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Paper sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Two-Factor Authentication</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Add an extra layer of security to your account
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={security.twoFactorEnabled}
                      onChange={() => handleSecurityToggle('twoFactorEnabled')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Login Notifications</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Get notified when someone logs into your account
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={security.loginNotifications}
                      onChange={() => handleSecurityToggle('loginNotifications')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Session Timeout</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Automatically log out after inactivity
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={security.sessionTimeout}
                      onChange={() => handleSecurityToggle('sessionTimeout')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Paper sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Email Notifications</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Receive notifications via email
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.emailNotifications}
                      onChange={() => handleNotificationToggle('emailNotifications')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Push Notifications</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Receive push notifications on your device
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.pushNotifications}
                      onChange={() => handleNotificationToggle('pushNotifications')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Task Reminders</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Get reminded about upcoming task deadlines
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.taskReminders}
                      onChange={() => handleNotificationToggle('taskReminders')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Ticket Updates</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Get notified about ticket status changes
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.ticketUpdates}
                      onChange={() => handleNotificationToggle('ticketUpdates')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Weekly Digest</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Receive a weekly summary of your activities
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications.weeklyDigest}
                      onChange={() => handleNotificationToggle('weeklyDigest')}
                    />
                  }
                  label=""
                />
              </Box>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Paper sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Appearance Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Dark Mode</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Use dark theme across the application
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={appearance.darkMode}
                      onChange={() => handleAppearanceToggle('darkMode')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body1">Compact Mode</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Use compact spacing and smaller fonts
                  </Typography>
                </Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={appearance.compactMode}
                      onChange={() => handleAppearanceToggle('compactMode')}
                    />
                  }
                  label=""
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="body1" gutterBottom>
                  Font Size
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={appearance.fontSize}
                  onChange={(e) => setAppearance({ ...appearance, fontSize: e.target.value })}
                >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Paper sx={{ p: 3, maxWidth: 600 }}>
            <Typography variant="h6" gutterBottom>
              Language & Region
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Language"
                  select
                  fullWidth
                  value={profile.language}
                  onChange={(e) => handleProfileChange('language', e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                  <MenuItem value="zh">Chinese</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Timezone"
                  select
                  fullWidth
                  value={profile.timezone}
                  onChange={(e) => handleProfileChange('timezone', e.target.value)}
                >
                  <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                  <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                  <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                  <MenuItem value="Europe/London">GMT (London)</MenuItem>
                  <MenuItem value="Europe/Paris">CET (Paris)</MenuItem>
                  <MenuItem value="Asia/Tokyo">JST (Tokyo)</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;

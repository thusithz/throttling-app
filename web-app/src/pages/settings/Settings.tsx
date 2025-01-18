import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Notifications, Security, Palette } from '@material-ui/icons';
import Button from '../../ui-components/Button';
import Alert, { iAlert } from '../../ui-components/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    background: 'linear-gradient(45deg, #43A047 30%, #66BB6A 90%)',
    color: 'white',
  },
  section: {
    marginTop: theme.spacing(2),
    background: 'white',
    borderRadius: theme.shape.borderRadius,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Settings = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [alertQueue, setAlertQueue] = useState<iAlert[]>([]);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    twoFactor: false,
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleToggle = (setting: keyof typeof settings) => () => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  return (
    <Box className={classes.root}>
      <Alert alertQueue={alertQueue} setAlertQueue={setAlertQueue} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Settings</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.section}>
            <List>
              <ListItem button onClick={handleToggle('notifications')}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <Switch
                  checked={settings.notifications}
                  onChange={handleToggle('notifications')}
                />
              </ListItem>
              <ListItem button onClick={handleToggle('darkMode')}>
                <ListItemIcon>
                  <Palette />
                </ListItemIcon>
                <ListItemText primary="Dark Mode" />
                <Switch
                  checked={settings.darkMode}
                  onChange={handleToggle('darkMode')}
                />
              </ListItem>
              <ListItem button onClick={handleToggle('twoFactor')}>
                <ListItemIcon>
                  <Security />
                </ListItemIcon>
                <ListItemText primary="Two-Factor Authentication" />
                <Switch
                  checked={settings.twoFactor}
                  onChange={handleToggle('twoFactor')}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => navigate('/profile')}
              className={classes.button}
            >
              Back to Profile
            </Button>
            <Button
              onClick={handleLogout}
              color="secondary"
              className={classes.button}
            >
              Logout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Avatar,
  Grid,
  Box,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../ui-components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
    background: 'linear-gradient(45deg, #7B1FA2 30%, #9C27B0 90%)',
    color: 'white',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto',
    marginBottom: theme.spacing(2),
    border: '3px solid white',
  },
  section: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    background: 'white',
    borderRadius: theme.shape.borderRadius,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </Avatar>
            <Typography variant="h4" align="center">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {user.email}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.section}>
            <Typography variant="h6">Account Information</Typography>
            <Divider />
            <Box mt={2}>
              <Typography>
                Member since: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => navigate('/settings')}
              className={classes.button}
            >
              Settings
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              className={classes.button}
            >
              Dashboard
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;

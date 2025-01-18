import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

/* eslint-disable */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random/?technology)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative' as const,
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    maxWidth: 400,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 600,
  },
  formContainer: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

interface Props {
  children: React.ReactNode;
  label: string;
}

const LeftImageContainer = ({ children, label }: Props) => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" className={classes.title}>
            {label}
          </Typography>
          <div className={classes.formContainer}>{children}</div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LeftImageContainer;

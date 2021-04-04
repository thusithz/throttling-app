import React, { Fragment, memo, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect as connectFormik } from 'formik';

import LeftImageContainer from '../components/LeftImageContainer';
import TextField from '../../ui-components/TextField';
import Button from '../../ui-components/Button';
import Alert, { iAlert } from '../../ui-components/Alert';

import * as helpers from '../../api/helpers';
import apiRouets from '../../config/apiRoutes';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// eslint-disable-next-line
function LoginForm(props: any) {
  const classes = useStyles();
  const [alertQueue, setAlertQueue] = useState<iAlert[]>([]);

  const { formik } = props;
  const { values, isValid, dirty } = formik;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (isValid) {
      try {
        const { email, password } = values;
        const res: any = await helpers.post(apiRouets.LOGIN, {
          email,
          password,
        });
        const status = res.status;
        setAlertQueue([
          ...alertQueue,
          {
            severity: status === 200 ? 'success' : 'error',
            message: res.data.message,
            id: new Date().getTime(),
          },
        ]);

        //TODO Need to dispatch into store and redirect
        //if (status === 200) {}
      } catch (err) {
        setAlertQueue([
          ...alertQueue,
          {
            severity: 'error',
            message: 'Technical Error',
            id: new Date().getTime(),
          },
        ]);
      }
    }
  };

  return (
    <Fragment>
      <Alert alertQueue={alertQueue} setAlertQueue={setAlertQueue} />
      <LeftImageContainer label="Sign In">
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={!dirty || !isValid}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item justify="flex-end">
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </LeftImageContainer>
    </Fragment>
  );
}

export default memo(connectFormik(LoginForm));

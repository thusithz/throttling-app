import React, { memo, useState } from 'react';
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

const defaultFieldPros = (fieldName: string) => {
  return {
    variant: 'outlined',
    margin: 'normal',
    required: true,
    fullWidth: true,
    id: fieldName,
    name: fieldName,
    autoComplete: fieldName,
  };
};

// eslint-disable-next-line
function SignupForm(props: any) {
  const classes = useStyles();
  const [alertQueue, setAlertQueue] = useState<iAlert[]>([]);

  const { formik } = props;
  const { values, isValid, dirty } = formik;

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (isValid) {
      try {
        const { email, password, firstName, lastName } = values;
        const res: any = await helpers.post(apiRouets.REGISTER, {
          email,
          password,
          firstName,
          lastName,
        });
        const status = res.status;
        setAlertQueue([
          ...alertQueue,
          {
            severity: status === 201 ? 'success' : 'error',
            message: res.data.message,
            id: new Date().getTime(),
          },
        ]);

        if (res?.data?.data?.token) {
          localStorage.setItem('token', res?.data?.data?.token);
          window.location.href = '/dashboard';
        }
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
    <LeftImageContainer label="Sign Up">
      <Alert alertQueue={alertQueue} setAlertQueue={setAlertQueue} />
      <form className={classes.form}>
        <TextField {...defaultFieldPros('firstName')} label="First Name" />
        <TextField {...defaultFieldPros('lastName')} label="Last Name" />
        <TextField {...defaultFieldPros('email')} label="Email Address" />
        <TextField
          {...defaultFieldPros('password')}
          autoComplete="current-password"
          label="Password"
          type="password"
        />
        <TextField
          {...defaultFieldPros('confirmPassword')}
          type="password"
          label="Confirm password"
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
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {'Already signup ? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </form>
    </LeftImageContainer>
  );
}

export default memo(connectFormik(SignupForm));

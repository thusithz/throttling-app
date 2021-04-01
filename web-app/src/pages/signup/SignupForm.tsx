import React from "react";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import LeftImageContainer from "../components/LeftImageContainer";
import TextField from "../../ui-components/TextField";
import Button from "../../ui-components/Button";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const defaultFieldPros = (fieldName: string) => {
  return {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    id: fieldName,
    name: fieldName,
    autoComplete: fieldName,
  };
};

// eslint-disable-next-line
export default function LoginForm() {
  const classes = useStyles();

  const onSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <LeftImageContainer label="Sign Up">
      <form className={classes.form}>
        <TextField
          {...defaultFieldPros("firstName")}
          autoFocus
          label="First Name"
        />
        <TextField {...defaultFieldPros("lastName")} label="Last Name" />
        <TextField {...defaultFieldPros("email")} label="Email Address" />
        <TextField
          {...defaultFieldPros("password")}
          autoComplete="current-password"
          label="Password"
          type="password"
        />
        <TextField
          {...defaultFieldPros("confirmPassword")}
          type="password"
          label="Confirm password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onSubmit}
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/login" variant="body2">
              {"Already signup ? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </LeftImageContainer>
  );
}

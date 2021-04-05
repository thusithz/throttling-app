import React, { Fragment } from 'react';
import * as Yup from 'yup';
import LoginForm from './LoginForm';

import { Formik } from 'formik';

export interface iLoginForm {
  email: string;
  password: string;
}

export const schema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/, {
      message:
        'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    })
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    ),
});

// eslint-disable-next-line
function Login() {
  return (
    <Fragment>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        // eslint-disable-next-line
        onSubmit={(values: iLoginForm, actions) => {}}
        validationSchema={schema}
        validateOnChange
        validateOnBlur
      >
        <div className="login-conatiner">
          <LoginForm />
        </div>
      </Formik>
    </Fragment>
  );
}

export default Login;

import React from 'react';
import * as Yup from 'yup';
import LoginForm from './LoginForm';

import { Formik } from 'formik';

export interface ILoginForm {
  email: string;
  password: string;
}

export const schema = Yup.object().shape({
  email: Yup.string().email().required('Email must be a valid email'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/, {
      message:
        'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    })
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    ),
});

function Login() {
  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      validateOnSubmit
      validationSchema={schema}
      onSubmit={() => {
        console.log('Login form submitted');
      }}
    >
      <div className="login-conatiner">
        <LoginForm />
      </div>
    </Formik>
  );
}

export default Login;

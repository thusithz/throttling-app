import React, { Fragment } from 'react';
import * as Yup from 'yup';
import SignupForm from './SignupForm';

import { Formik } from 'formik';

interface iSignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  LastName: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email().required('Enter valid email-id'),
  firstName: Yup.string().required('Please enter first name'),
  lastName: Yup.string().required('Please enter last name'),
  password: Yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/, {
      message:
        'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    })
    .required(
      'Please valid password. One uppercase, one lowercase, one special character and no spaces',
    ),
  confirmPassword: Yup.string()
    .required('Required')
    .test('password-match', 'Password musth match', function (value) {
      return this.parent.password === value;
    }),
});

// eslint-disable-next-line
function Signup() {
  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: '',
          LastName: '',
          password: '',
          confirmPassword: '',
          email: '',
        }}
        // eslint-disable-next-line
        onSubmit={(values: iSignUpForm, actions) => {}}
        validationSchema={schema}
        validateOnChange
        validateOnBlur
      >
        <div className="signup-conatiner">
          <SignupForm />
        </div>
      </Formik>
    </Fragment>
  );
}

export default Signup;

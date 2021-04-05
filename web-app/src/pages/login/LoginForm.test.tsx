import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import { schema, iLoginForm } from './Login';
import LoginForm from './LoginForm';
import { Formik } from 'formik';

const connectWithFormik = (Component: any) => ({ formik, ...otherProps }) => {
  return (
    <Formik
      initialValues={formik && formik.values}
      // eslint-disable-next-line
      onSubmit={(values: iLoginForm, actions) => {}}
      validationSchema={schema}
      validateOnChange
      validateOnBlur
    >
      <Component formik={formik} {...otherProps} />
    </Formik>
  );
};

describe('LoginForm Page', () => {
  afterEach(() => cleanup());

  test('Form Error State', async () => {
    const loginFormWithFormik = connectWithFormik(LoginForm);
    const { container, getByText, getAllByLabelText } = render(
      loginFormWithFormik({
        values: { email: 'test gmail.com', password: '123' },
        formik: {
          values: { email: 'test gmail.com', password: '123' },
          setFieldValue: jest.fn,
          setFieldTouched: jest.fn,
        },
      }),
    );

    expect(container.querySelector("button[id='submit']")).toBeDisabled();

    const emailInput = container.querySelector("input[id='email']");

    act(() => {
      fireEvent.blur(emailInput);
    });

    expect(
      await container.querySelector("p[id='email-helper-text'"),
    ).toBeDefined();

    expect(
      await container.querySelector("p[id='password-helper-text'"),
    ).toBeDefined();
  });

  test('Form Susccess State', async () => {
    const loginFormWithFormik = connectWithFormik(LoginForm);
    const { container, getByText, getAllByLabelText } = render(
      loginFormWithFormik({
        values: { email: 'test@gmail.com', password: '12345Abcd!2' },
        formik: {
          values: { email: 'test@gmail.com', password: '12345Abcd!2' },
          setFieldValue: jest.fn,
          setFieldTouched: jest.fn,
        },
      }),
    );

    const submitButtom = container.querySelector("button[id='submit']");
    expect(submitButtom).toBeDisabled();

    const emailInput = container.querySelector("input[id='email']");

    act(() => {
      fireEvent.blur(emailInput);
    });

    expect(
      await container.querySelector("p[id='email-helper-text'"),
    ).toBeNull();

    expect(
      await container.querySelector("p[id='password-helper-text'"),
    ).toBeNull();
  });
});

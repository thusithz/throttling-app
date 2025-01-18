import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Formik } from 'formik';
import LoginForm from './LoginForm';
import { schema } from './Login';

describe('LoginForm Component', () => {
  const renderLoginForm = (initialValues = { email: '', password: '' }) => {
    render(
      <BrowserRouter>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={jest.fn()}
        >
          <LoginForm />
        </Formik>
      </BrowserRouter>,
    );
  };

  it('should render form elements', () => {
    renderLoginForm();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    expect(screen.getByText(/don't have an account/i)).toBeInTheDocument();
  });

  it('should show validation errors for invalid inputs', async () => {
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/Email must be a valid email/i)).toBeInTheDocument();
      expect(screen.getByText(/Please valid password. One uppercase, one lowercase, one special character and no spaces/i)).toBeInTheDocument();
    });
  });

  it('should not show validation errors for valid inputs', async () => {
    renderLoginForm();
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPass1!' } });
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.queryByText(/enter valid email-id/i),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/please valid password/i),
      ).not.toBeInTheDocument();
    });
  });
});

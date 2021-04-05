import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Login from './Login';

describe('Login Page', () => {
  afterEach(() => cleanup());

  test('Render', () => {
    const { container, getAllByText, getByText } = render(<Login />);
    const signInLabel = getAllByText(/Sign In/i);
    const forgotPasswordLabel = getByText(/Forgot password?/i);
    expect(container).toBeDefined();
    expect(signInLabel.length).toBe(2);
    expect(forgotPasswordLabel).toBeDefined();
  });
});

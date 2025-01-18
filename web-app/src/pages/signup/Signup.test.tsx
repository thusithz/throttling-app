import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';

describe('Signup Component', () => {

  it('renders signup form', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>,
    );
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(2);
  });
});

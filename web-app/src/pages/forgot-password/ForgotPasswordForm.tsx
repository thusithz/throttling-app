import React, { useState } from 'react';
import TextField from '../../ui-components/TextField';
import Button from '../../ui-components/Button';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
}

const ForgotPasswordForm = ({ onSubmit, onBack }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        margin="normal"
      />
      <Button type="submit" fullWidth style={{ marginTop: '20px' }}>
        Reset Password
      </Button>
      <Button onClick={onBack} fullWidth style={{ marginTop: '10px' }}>
        Back to Login
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;

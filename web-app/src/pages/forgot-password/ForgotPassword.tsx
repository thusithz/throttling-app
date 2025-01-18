import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert, { iAlert } from '../../ui-components/Alert';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = () => {
  const [alertQueue, setAlertQueue] = useState<iAlert[]>([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setAlertQueue([
      ...alertQueue,
      {
        severity: 'success',
        message: 'Password reset instructions sent to your email',
        id: new Date().getTime(),
      },
    ]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Reset Password</h1>
      <Alert alertQueue={alertQueue} setAlertQueue={setAlertQueue} />
      <ForgotPasswordForm
        onSubmit={handleSubmit}
        onBack={() => navigate('/login')}
      />
    </div>
  );
};

export default ForgotPassword;

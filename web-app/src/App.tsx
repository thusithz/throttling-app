import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from './ui-components/Loading';

const LoginLazy = lazy(
  () => import(/* webpackChunkName: "login-page" */ './pages/login/Login'),
);

const SignupLazy = lazy(
  () => import(/* webpackChunkName: "signup-page" */ './pages/signup/Signup'),
);

const DashboardLazy = lazy(() => import('./pages/dashboard/Dashboard'));
const ProfileLazy = lazy(() => import('./pages/profile/Profile'));
const SettingsLazy = lazy(() => import('./pages/settings/Settings'));
const ForgotPasswordLazy = lazy(
  () => import('./pages/forgot-password/ForgotPassword'),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LoginLazy />} />
          <Route path="/login" element={<LoginLazy />} />
          <Route path="/signup" element={<SignupLazy />} />
          <Route path="/dashboard" element={<DashboardLazy />} />
          <Route path="/profile" element={<ProfileLazy />} />
          <Route path="/settings" element={<SettingsLazy />} />
          <Route path="/forgot-password" element={<ForgotPasswordLazy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

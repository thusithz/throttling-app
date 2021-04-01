import React, { Fragment, Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Loading from './ui-components/Loading';

const LoginLazy = lazy(
  () => import(/* webpackChunkName: "login-page" */ './pages/login/Login'),
);

const SignupLazy = lazy(
  () => import(/* webpackChunkName: "signup-page" */ './pages/signup/Signup'),
);

const DashboardLazy = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard-page" */ './pages/dashboard/Dashboard'
    ),
);

// eslint-disable-next-line
function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Route path="/" component={LoginLazy} />
          <Route path="/login" component={LoginLazy} />
          <Route path="/signup" component={SignupLazy} />
          <Route path="/dashboard" component={DashboardLazy} />
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;

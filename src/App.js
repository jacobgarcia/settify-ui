// Libraries
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotificationsProvider } from '@credijusto/ui-components';
// Components
import Settify from 'views/Settify/Imported';
import Login from 'views/Login/Imported';
import Logout from 'views/Logout';
import { AuthProvider } from 'contexts/auth';
import useAuth from 'hooks/auth';
// Styles
import 'styles/index.scss';
// constants

// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split('&')
  .reduce((initial, item) => {
    const init = initial;
    if (item) {
      const parts = item.split('=');
      init[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

const App = () => {
  const { hasToken, authenticate } = useAuth();

  useEffect(() => {
    // Set token
    const { access_token: token, expires_in: expiration } = hash;
    if (token) {
      // Set token
      authenticate({ token, expiration: Date.now() + expiration });
    }
  });

  const Component = hasToken ? Settify : Login;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/" component={Component} />
      </Switch>
    </BrowserRouter>
  );
};

const AppWithContexts = () => (
  <AuthProvider>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </AuthProvider>
);

export default AppWithContexts;

// Libraries
import React from 'react';
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

const App = () => {
  const { hasToken } = useAuth();

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

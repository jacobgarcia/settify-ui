import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from 'hooks/auth';

const Logout = () => {
  const { removeSession } = useAuth();

  removeSession();

  return <Redirect to="/" />;
};

export default Logout;

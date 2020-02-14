import React from 'react';
import LogRocket from 'logrocket';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';
import { Button, Notify } from '@credijusto/ui-components';

import useAuth from 'hooks/auth';

import googleLogo from './google-logo.svg';

const GoogleButton = styled(Button)`
  &.button-primary {
    background-color: #ffffff !important;
    display: flex;
    color: #888;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;

    &:hover {
      box-shadow: 0 1px 5px rgba(66, 133, 244, 0.3);
    }

    img {
      margin-right: 8px;
      width: 20px;
    }
  }
`;

const LoginButton = () => {
  const { authenticate } = useAuth();

  const handleFailure = (error) => {
    LogRocket.captureException(error);
    Notify.error('Ocurrió un error de Google al iniciar sesión.');
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={authenticate}
      onFailure={handleFailure}
      render={({ onClick, disabled }) => (
        <GoogleButton onClick={onClick} disabled={disabled}>
          <img src={googleLogo} alt="Google Signin" />
          Continuar con Google
        </GoogleButton>
      )}
      responseType="id_token"
    />
  );
};

export default LoginButton;

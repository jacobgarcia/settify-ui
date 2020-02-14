/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Box } from '@credijusto/ui-components';

import LoginButton from 'components/LoginButton';

import {
  InputSide,
  LoginContainer,
  LoginHeader,
  LoginSubtitle,
  StyledLeftPanel,
  StyledLogo,
} from './styled';

const Login = () => {
  return (
    <LoginContainer>
      <StyledLeftPanel
        flex="1"
        justify="center"
        padding={{ horizontal: 'space-500', vertical: '100px' }}
        direction="column"
      >
        <StyledLogo />
        <Box gap="space-400">
          <LoginHeader>Settify</LoginHeader>
          <LoginSubtitle>
            Set theory applied to Spotify playlists. Easy as it sounds.
          </LoginSubtitle>
        </Box>
      </StyledLeftPanel>
      <InputSide flex="1">
        <Box justify="center">
          <LoginButton />
        </Box>
      </InputSide>
    </LoginContainer>
  );
};

export default Login;

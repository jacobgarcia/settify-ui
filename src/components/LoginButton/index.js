import React from 'react';
import Button from 'components/Button';

const LoginButton = () => {
  return (
    <a href="https://accounts.spotify.com/authorize?client_id=8be10436cdeb41deab45fc7502265679&redirect_uri=http://localhost:3000/&scope=user-read-private%20user-read-email%20playlist-modify-public&response_type=token&state=123">
      <Button rounded>Login With Spotify</Button>
    </a>
  );
};

export default LoginButton;

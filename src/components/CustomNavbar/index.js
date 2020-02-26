import React from 'react';
import Navbar from 'components/Navbar';

import useAuth from 'hooks/auth';

const playlists = {
  icon: 'music-box',
  label: 'Playlists',
  to: '/',
  id: 'playlists',
  color: '#0db654',
};

const SettifyNavbar = () => {
  const { getProfile } = useAuth();
  const { name, image } = getProfile();
  console.log(image[0].url);
  const navItems = [playlists];

  return (
    <Navbar
      username={name || 'User'}
      userImg={image[0].url}
      navItems={navItems}
    />
  );
};

export default SettifyNavbar;

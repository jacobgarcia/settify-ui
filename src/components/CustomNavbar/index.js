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
  const { name, imageUrl } = getProfile();

  const navItems = [playlists];

  return (
    <Navbar username={name || 'User'} userImg={imageUrl} navItems={navItems} />
  );
};

export default SettifyNavbar;

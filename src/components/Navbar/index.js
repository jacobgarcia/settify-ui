import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import DropdownMenu from './DropdownMenu';

import {
  StyledNavbar,
  NavbarContainer,
  ActionItems,
  StyledLogo,
} from './styled';

const logoutItem = {
  label: 'Cerrar sesión',
  icon: 'logout',
  to: '/logout',
  id: 'logout',
};

const config = {
  testId: 'navbar',
};

const Navbar = ({
  isRelative,
  navItems,
  configurationItems,
  username,
  location,
  fluid,
}) => {
  const [selectedItem, setSelectedItem] = useState(
    navItems.find(({ to }) => location && location.pathname.includes(to)) ||
      navItems[0]
  );

  useEffect(
    () => {
      const newSelectedItem = navItems.find(
        ({ to }) => location && location.pathname.includes(to)
      );

      setSelectedItem(newSelectedItem || navItems[0]);
    },
    [location && location.pathname]
  );

  return (
    <StyledNavbar data-testid={config.testId} isRelative={isRelative}>
      <NavbarContainer fluid={fluid}>
        <StyledLogo />
        <ActionItems>
          {selectedItem && (
            <DropdownMenu
              text={selectedItem.label}
              icon={selectedItem.icon}
              items={navItems}
            />
          )}
          {username && (
            <DropdownMenu
              isAccount
              text={username}
              items={[...configurationItems, logoutItem]}
              icon="account-circle"
              menuStartsFrom="right"
            />
          )}
        </ActionItems>
      </NavbarContainer>
    </StyledNavbar>
  );
};

Navbar.defaultProps = {
  isRelative: false,
  navItems: [],
  configurationItems: [],
  username: '',
  fluid: false,
};

Navbar.propTypes = {
  fluid: PropTypes.bool,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  configurationItems: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      to: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.string,
  /* Disables the `position: fixed` */
  isRelative: PropTypes.bool,
};

export { config };

export default withRouter(Navbar);

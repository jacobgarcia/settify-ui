import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Icon } from '@credijusto/ui-components';
import {
  DropDownItem,
  DropDownItemLabel,
  DropDownItemLink,
  DropDownItemIcon,
} from './styled';

const config = {
  testId: 'dropdown-menu-item',
  linkTestId: 'dropdown-menu-item-link',
};

const MenuItem = ({ label, icon, color, to }) => (
  <DropDownItem data-testid={config.testId} color={color}>
    <DropDownItemLink as={Link} data-testid={config.linkTestId} to={to}>
      <DropDownItemIcon as={Icon} icon={icon} />
      <DropDownItemLabel>{label}</DropDownItemLabel>
    </DropDownItemLink>
  </DropDownItem>
);

MenuItem.defaultProps = {
  icon: 'settings',
  color: '',
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  to: PropTypes.string.isRequired,
};

export { config };

export default MenuItem;

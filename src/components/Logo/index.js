import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './style.pcss';

import { ReactComponent as CredijustoLogo } from './credijusto-clean-logo.svg';

const variants = ['default', 'white', 'white_text'];
const config = { testId: 'credijusto-logo' };

const Logo = ({ className, kind }) => (
  <Link
    to="/"
    className={classNames('credijusto_imagotype_container', className)}
    data-testid="Logo"
  >
    <CredijustoLogo
      className={`credijusto_imagotype credijusto_imagotype-${kind}`}
    />
  </Link>
);

Logo.propTypes = {
  className: PropTypes.string,
  kind: PropTypes.oneOf(variants),
};

Logo.defaultProps = {
  className: '',
  kind: 'default',
};

export { variants, config };

export default Logo;

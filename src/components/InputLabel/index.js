import React from 'react';
import PropTypes from 'prop-types';

import './style.pcss';

const InputLabel = ({ label, isRequired, htmlFor, children, ...props }) => (
  // eslint-disable-next-line jsx-a11y/label-has-for
  <label className="credijusto_label" htmlFor={htmlFor} {...props}>
    <span>
      {label}
      {isRequired && '*'}
    </span>
    {children}
  </label>
);

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  children: PropTypes.node,
};

InputLabel.defaultProps = {
  isRequired: false,
  children: null,
};

export default InputLabel;

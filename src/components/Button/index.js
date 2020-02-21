import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Box } from '@credijusto/ui-components';
import StyledButton from './styled';

const Button = (props) => {
  const {
    onClick,
    disabled,
    rounded,
    uppercase,
    loading,
    className,
    kind,
    text,
    children,
    type,
    id,
    ...rest
  } = props;

  return (
    <StyledButton
      id={id}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      kind={kind}
      {...rest}
    >
      <Box direction="row" justify="center" margin={{ gap: 'space-100' }}>
        {text || children}
        {loading && <Icon customSize="18px" icon="loading" spin size="small" />}
      </Box>
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  uppercase: PropTypes.bool,
  id: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  kind: PropTypes.oneOf([
    'primary',
    'secondary',
    'complementary',
    'destructive',
    'warning',
  ]),
};

Button.defaultProps = {
  onClick: () => {},
  children: '',
  disabled: false,
  rounded: false,
  loading: false,
  uppercase: false,
  id: '',
  text: '',
  className: '',
  kind: 'primary',
  type: 'button',
};

export default Button;

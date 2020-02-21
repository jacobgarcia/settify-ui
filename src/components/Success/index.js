import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card } from '@credijusto/ui-components';

import './style.pcss';

const Success = ({ message, action, description, fail }) => (
  <Card>
    <div className="credijusto_success">
      {!fail ? (
        <div className="credijusto_success--icon">
          <Icon icon="check-circle" size="medium" />
        </div>
      ) : (
        <div className="credijusto_success--icon" style={{ color: '#ff8a00' }}>
          <Icon icon="minus-circle" size="medium" />
        </div>
      )}
      <p className="credijusto_success--message">{message}</p>
      <p
        className="credijusto_success--message"
        style={{ fontSize: '1rem', fontWeight: 400 }}
      >
        {description}
      </p>
      {action && <div className="credijusto_success--action">{action}</div>}
    </div>
  </Card>
);

Success.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
  action: PropTypes.node,
  fail: PropTypes.bool,
};

Success.defaultProps = {
  message: 'Operación realizada con éxito',
  description: null,
  action: null,
  fail: false,
};

export default Success;

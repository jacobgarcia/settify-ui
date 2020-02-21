import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Card } from '@credijusto/ui-components';

import './style.pcss';

const Success = ({ message, action, description }) => (
  <Card>
    <div className="credijusto_success">
      <div className="credijusto_success--icon">
        <Icon icon="check-circle" size="medium" />
      </div>
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
};

Success.defaultProps = {
  message: 'Operación realizada con éxito',
  description: null,
  action: null,
};

export default Success;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const FormItem = (props) => {
  const {
    help,
    labelPosition,
    invalidMessage,
    label,
    children,
    className,
  } = props;

  return (
    <div
      className={classNames('credijusto_input', className)}
      style={{ marginBottom: '0px' }}
    >
      <div
        className={`credijusto_input--label-position credijusto_input--label-position-${labelPosition}`}
      >
        {label && (
          <span
            className={`credijusto_input--label credijusto_input--label-${labelPosition}`}
          >
            {label}
          </span>
        )}
        <div
          className={classNames(
            'control credijusto_input--control',
            'credijusto_input--checkbox-control',
            {
              'credijusto_select--control': children.type === 'select',
              'credijusto_input--checkbox-right': labelPosition === 'right',
            }
          )}
        >
          {children}
        </div>
      </div>
      {help && <p className="credijusto_input--help">{help}</p>}
      {invalidMessage && (
        <p className="credijusto_input--error">{invalidMessage}</p>
      )}
    </div>
  );
};

FormItem.propTypes = {
  label: PropTypes.string,
  help: PropTypes.string,
  invalidMessage: PropTypes.string,
  labelPosition: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FormItem.defaultProps = {
  label: '',
  help: '',
  invalidMessage: '',
  labelPosition: 'up',
  className: '',
};

export default FormItem;

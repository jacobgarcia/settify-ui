/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FormItem from 'components/FormItem';

import './style.scss';

/**
 * @typedef {Object} Input
 * @property {name} the name of the field
 * @property {boolean} the value for name
 */

class Checkbox extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    help: PropTypes.string,
    labelPosition: PropTypes.oneOf(['left', 'right']),
    defaultValue: PropTypes.bool,
    disabled: PropTypes.bool,
    isSwitch: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    label: '',
    labelPosition: 'right',
    help: '',
    defaultValue: undefined,
    disabled: false,
    isRequired: false,
    isSwitch: false,
  };

  constructor(props) {
    super(props);
    const { defaultValue } = props;

    this.state = {
      value: defaultValue || false,
    };
  }

  /*
   * Toggle the value of the checkbox, then notify that the value has changed
   */
  toggle = () => {
    this.setState(
      (state) => ({ value: !state.value }),
      this.notifyValueChanged
    );
  };

  /*
   * Call onChange function when invoked by toggle
   */
  notifyValueChanged = () => {
    const { onChange, name } = this.props;
    const { value } = this.state;
    onChange(value, name);
  };

  /*
   * In some cases requirement will be to have the checkbox checked
   * If not required, any value is okay
   * @returns {boolean}
   */
  validate = () => {
    const { isRequired } = this.props;
    const { value } = this.state;
    if (isRequired) return !!value;
    return true;
  };

  /*
   * Validate the current value for this input, if valid export otherwise return null
   * @returns {?boolean} - The current value of the input
   */
  validateAndExport = () => (this.validate() ? this.export() : null);

  /*
   * Return the current value of the input
   * @returns {Input}
   */
  export = () => {
    const { value } = this.state;
    const { name } = this.props;
    return { [name]: value };
  };

  render() {
    const { value } = this.state;
    const { label, labelPosition, help, disabled, isSwitch, name } = this.props;

    return (
      <FormItem
        className={classnames({ 'credijusto_input-switch': isSwitch })}
        label={label}
        help={help}
        labelPosition={labelPosition}
      >
        <input
          id={name}
          type="checkbox"
          className={classnames('credijusto_checkbox', {
            credijusto_switch: isSwitch,
          })}
          onChange={this.toggle}
          disabled={disabled}
          checked={value}
        />
        {isSwitch && <label htmlFor={name} />}
      </FormItem>
    );
  }
}

export default Checkbox;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styled from 'styled-components';

import { useValidation } from '@credijusto/ui-components';
import InputLabel from 'components/InputLabel';
import './style.pcss';

const CheckboxLabel = styled(InputLabel)`
  span {
    margin: 0;
    display: flex;
    align-items: center;
  }
`;

const CJCheckbox = ({
  name,
  value,
  externalValue,
  label,
  onChange,
  disabled,
  isGrouped,
  isRequired,
  formId,
  updateFormValue,
  setIsValid,
  userHasSubmitted,
  isSwitch,
  onKeyDown,
}) => {
  const [shouldValidate, setShouldValidate] = useState(userHasSubmitted);
  const { isValid, errorMessage } = useValidation({ value, isRequired });

  useEffect(() => setIsValid(isValid), [isValid]);
  useEffect(() => setShouldValidate(userHasSubmitted), [userHasSubmitted]);
  // If externalValue changes, update the value in Form. Also runs on first render
  useEffect(() => updateFormValue({ target: { name, value: externalValue } }), [
    externalValue,
  ]);

  const handleChange = (e) => {
    onChange(e);
    updateFormValue({ target: { name, value: e.target.checked } });
  };

  return (
    <div
      className={classNames('cj_checkbox--component', {
        'credijusto_input-is_grouped': isGrouped,
        'credijusto_input-switch': isSwitch,
      })}
      style={{ marginBottom: '0px' }}
    >
      <div className="cj_checkbox--wrapper">
        <input
          id={name}
          name={name}
          type="checkbox"
          className={classNames('cj_checkbox', {
            cj_switch: isSwitch,
          })}
          onChange={handleChange}
          disabled={disabled}
          checked={value}
          data-testid={`test-${formId}-${name}`}
          onKeyDown={onKeyDown}
        />
        <CheckboxLabel htmlFor={name} isRequired={isRequired} label={label} />
      </div>
      {shouldValidate && !isValid && (
        <p className="credijusto_input--error">{errorMessage}</p>
      )}
    </div>
  );
};

CJCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
  externalValue: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isGrouped: PropTypes.bool,
  onKeyDown: PropTypes.func,
  // Validation props
  isRequired: PropTypes.bool,
  // Props injected by Form:
  formId: PropTypes.string,
  updateFormValue: PropTypes.func,
  setIsValid: PropTypes.func,
  userHasSubmitted: PropTypes.bool,
  isSwitch: PropTypes.bool,
};

CJCheckbox.defaultProps = {
  value: false,
  externalValue: false,
  label: '',
  onChange: () => {},
  disabled: false,
  isGrouped: false,
  onKeyDown: () => {},
  // Validation props
  isRequired: false,
  // Props injected by Form:
  formId: '',
  updateFormValue: () => {},
  setIsValid: () => {},
  userHasSubmitted: false,
  isSwitch: false,
};

CJCheckbox.isFormItem = true;

export default CJCheckbox;

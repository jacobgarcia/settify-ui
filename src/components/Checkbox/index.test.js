import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';

import Checkbox from '.';

const props = {
  name: 'check',
  label: 'Label',
  defaultValue: true,
};

describe('<Checkbox />', () => {
  test('Should render a Checkbox with a label', () => {
    const { getByText } = render(<Checkbox {...props} />);
    const { textContent: label } = getByText(props.label);

    // Assert
    expect(label).toEqual(props.label);
  });

  test('Should return the checkbox name, value', () => {
    const wrapper = mount(<Checkbox {...props} />);

    // Assert
    expect(wrapper.instance().export()).toMatchObject({
      [props.name]: props.defaultValue,
    });
    expect(wrapper.instance().validateAndExport()).toMatchObject({
      [props.name]: props.defaultValue,
    });
  });

  test('Should validate the required checkbox', () => {
    const valid = mount(<Checkbox {...props} />);
    const stillValid = mount(<Checkbox {...props} isRequired />);
    const invalid = mount(
      <Checkbox {...props} isRequired defaultValue={false} />
    );

    // Assert
    expect(valid.instance().validate()).toEqual(true);
    expect(stillValid.instance().validate()).toEqual(true);
    expect(invalid.instance().validate()).toEqual(false);
  });

  test('Should return null if required and value false', () => {
    const wrapper = mount(
      <Checkbox {...props} defaultValue={false} isRequired />
    );

    // Assert
    expect(wrapper.instance().validateAndExport()).toBeNull();
  });

  test('Should call the onChange after updating the value', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox {...props} onChange={onChange} />);
    wrapper.instance().toggle();

    // Assert
    expect(onChange).toHaveBeenCalledWith(!props.defaultValue, props.name);
  });
});

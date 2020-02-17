import React from 'react';
import { shallow } from 'enzyme';

import AppFooter from '.';

describe('AppFooter', () => {
  test('Should render an <AppFooter /> component', () => {
    const wrapper = shallow(<AppFooter />);

    expect(wrapper.find('a').length).toEqual(1);
    expect(wrapper.find('a').props().href).toBeDefined();
  });
});

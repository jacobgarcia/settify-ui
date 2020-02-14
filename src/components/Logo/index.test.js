import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Logo, { variants } from '.';

describe('Logo', () => {
  test('Should render a <Logo /> component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    expect(getByTestId('Logo')).toBeTruthy();
  });
  test.each([variants])(
    'Should add correct className by kind to <Logo /> component',
    (variant) => {
      const { getByTestId } = render(
        <MemoryRouter>
          <Logo kind={variant} />
        </MemoryRouter>
      );

      const logo = getByTestId('Logo');
      const svg = logo.children[0];
      const className = svg.getAttribute('class');
      const classNames = className.split(' ');

      expect(classNames).toContain(`credijusto_imagotype-${variant}`);
    }
  );
});

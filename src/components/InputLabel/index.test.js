import React from 'react';
import { render } from '@testing-library/react';

import InputLabel from '.';

const label = 'This is a test';
const props = {
  htmlFor: 'test',
  label,
};

describe('<InputLabel />', () => {
  test('Should render the label', () => {
    const { getByText } = render(<InputLabel {...props} />);
    expect(getByText(label)).toBeTruthy();
  });

  test('Should render the required label', () => {
    const { getByText } = render(<InputLabel {...props} isRequired />);
    expect(getByText(`${label}*`)).toBeTruthy();
  });

  test('Should render children', () => {
    const string = 'Hello world!';
    const { getByText } = render(
      <InputLabel>
        <p>{string}</p>
      </InputLabel>
    );

    expect(getByText(string)).toBeTruthy();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Pagination from '.';

describe('<Pagination />', () => {
  test('Renders a <Pagination /> component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Pagination currentPage={1} totalItems={10} />
      </MemoryRouter>
    );
    expect(getByTestId('pagination')).toBeTruthy();
  });

  test('Should render appropriate info content with currentPage is 1', () => {
    const expectedText = 'Mostrando resultado 1 a 10';
    const { queryByText } = render(
      <MemoryRouter>
        <Pagination currentPage={1} totalItems={25} />
      </MemoryRouter>
    );
    expect(queryByText(expectedText)).toBeTruthy();
  });

  test('Should render appropriate info content with currentPage is 2', () => {
    const expectedText = 'Mostrando resultado 11 a 20';
    const { queryByText } = render(
      <MemoryRouter>
        <Pagination currentPage={2} totalItems={25} />
      </MemoryRouter>
    );
    expect(queryByText(expectedText)).toBeTruthy();
  });

  test('Should render appropriate info content with currentPage is 3', () => {
    const expectedText = 'Mostrando resultado 21 a 25';
    const { queryByText } = render(
      <MemoryRouter>
        <Pagination currentPage={3} totalItems={25} />
      </MemoryRouter>
    );
    expect(queryByText(expectedText)).toBeTruthy();
  });

  test('Should render 2 pages because there are 20 itemsPerPage and 25 totalItems', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Pagination currentPage={1} totalItems={25} itemsPerPage={20} />
      </MemoryRouter>
    );

    expect(queryByText('2')).toBeTruthy();
    expect(queryByText('3')).toBeFalsy();
  });
});

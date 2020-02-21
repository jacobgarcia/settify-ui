import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import UIPagination, { getPagesToRender, MIN_FIXED_PAGES, ELLIPSIS } from '.';

const expectedPagesToRender = [
  [7, 1, [1, 2, 3, 4, ELLIPSIS, 7]],
  [7, 2, [1, 2, 3, 4, ELLIPSIS, 7]],
  [7, 3, [1, 2, 3, 4, ELLIPSIS, 7]],
  [7, 4, [1, ELLIPSIS, 3, 4, 5, ELLIPSIS, 7]],
  [7, 5, [1, ELLIPSIS, 4, 5, 6, 7]],
  [7, 6, [1, ELLIPSIS, 4, 5, 6, 7]],
  [7, 7, [1, ELLIPSIS, 4, 5, 6, 7]],
];

describe('<UIPagination />', () => {
  test('Renders a <UIPagination /> component', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <UIPagination totalPages={7} />
      </MemoryRouter>
    );
    expect(getByTestId('pagination')).toBeTruthy();
  });
  test.each(expectedPagesToRender)(
    'Generates pages to render',
    (totalPages, currentPage, expected) => {
      const expectedLength =
        currentPage === 4 ? MIN_FIXED_PAGES + 1 : MIN_FIXED_PAGES;
      const pagesToRender = getPagesToRender(totalPages, currentPage);

      expect(pagesToRender).toHaveLength(expectedLength);
      expect(pagesToRender).toEqual(expected);
    }
  );
  test('Changes url on click', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/test']}>
        <Route render={() => <UIPagination totalPages={7} />} />
      </MemoryRouter>
    );
    const page2 = getByText('2');

    fireEvent.click(page2);

    expect(page2.href).toBe('http://localhost/test?page=2');
  });
});

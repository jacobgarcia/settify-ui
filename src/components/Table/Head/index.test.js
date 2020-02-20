import React from 'react';
import { render } from '@testing-library/react';

import Head, { config } from '.';

const NAME_COLUMN = 'name';
const CURRENCY_COLUMN = 'currency';

const testColumns = [
  {
    label: NAME_COLUMN,
    key: NAME_COLUMN,
  },
  {
    key: CURRENCY_COLUMN,
    label: CURRENCY_COLUMN,
    type: 'currency',
  },
];

const props = {
  columnsOrder: [CURRENCY_COLUMN, NAME_COLUMN],
  columns: testColumns,
  compact: false,
  onClickHeader: () => {},
};

describe('<Head/>', () => {
  test('Renders the columns in the provided order', () => {
    const { getAllByTestId } = render(
      <table>
        <Head {...props} />
      </table>
    );
    const renderedColumns = getAllByTestId(config.testId);
    expect(renderedColumns).toHaveLength(2);
    const [currencyColumn, nameColumn] = renderedColumns;
    expect(currencyColumn.textContent).toBe(CURRENCY_COLUMN);
    expect(nameColumn.textContent).toBe(NAME_COLUMN);
  });

  test('Renders only the provided columns', () => {
    const { getAllByTestId } = render(
      <table>
        <Head {...props} columnsOrder={[NAME_COLUMN]} />
      </table>
    );
    const renderedColumns = getAllByTestId(config.testId);
    expect(renderedColumns).toHaveLength(1);
    const [nameColumn] = renderedColumns;
    expect(nameColumn.textContent).toBe(NAME_COLUMN);
  });
});

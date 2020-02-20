import { sortByKey } from '@credijusto/ui-components';

export const rightAlignedTypes = ['currency', 'number', 'percentage'];

/**
 * Returns the column alignment
 * @param {{ key: string}} column
 * @returns {string}
 */
export const getColumnAlignment = (column) =>
  rightAlignedTypes.includes(column.type) ? 'right' : 'left';

/**
 * orders a table data according to the current filter
 * @param {Array} data
 * @param {string} sortBy
 * @param {Array} columns
 * @returns {Array}
 */
export const sortData = (data, sortBy, columns) => {
  if (!sortBy) return data;
  const currentFilter = sortBy.replace('-', '');
  const columnToSort = columns.find(({ key }) => key === currentFilter);
  const isDesc = sortBy.startsWith('-');
  return sortByKey(data, currentFilter, isDesc ? 'desc' : 'asc', {
    isData: columnToSort.type === 'date',
  });
};

/**
 * Sums all the rows to get the averages row
 * @param {array} rows
 * @param {*} columnKey
 */
const sumTotals = (rows, columnKey) =>
  rows.reduce((prev, currentRow) => {
    const value = Number(currentRow[columnKey]);
    // Return the prev value when a nan value is provided
    return Number.isNaN(value) ? prev : prev + value;
  }, 0);

export const reduceAverages = (data, averages) => (acc, currentColumn) => ({
  ...acc,
  // If the column is in averages add the sum as the value otherwise keep the value empty
  [currentColumn.key]: averages.includes(currentColumn.key)
    ? sumTotals(data, currentColumn.key) / data.length
    : '-',
});

export const reduceTotals = (data, totals) => (acc, currentColumn) => ({
  ...acc,
  // If the column is in averages add the sum as the value otherwise keep the value empty
  [currentColumn.key]: totals.includes(currentColumn.key)
    ? sumTotals(data, currentColumn.key)
    : '-',
});

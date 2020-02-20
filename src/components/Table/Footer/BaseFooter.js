import React from 'react';
import PropTypes from 'prop-types';

import RowsContainer from '../RowsContainer';
import { getColumnAlignment } from '../utils';

const calculateColums = (data, columns) =>
  columns.map((column) => ({
    key: column.key,
    type: data.includes(column.key) ? column.type : 'emptyTotal',
    label: column.label,
    align: column.align || getColumnAlignment(column),
    isTotal: true,
  }));

/**
 * @typedef {Object} Props
 * @property {Boolean} compact
 * @property {import('ui-components/table').Column[]} [columns]
 * @property {string[]} columnsOrder Collection that determines which columns to render
 * @property {Object[]} [data] The actual table data
 * @property {Function} reduceFunction Function to use to calculate data
 * @property {string} rowKey identifier and text of the row
 * @property {array} dataToCalculate base data to make the calculations
 * @param {Props} props
 */
const BaseFooter = ({
  columns,
  compact,
  data,
  columnsOrder,
  style,
  reduceFunction,
  rowKey,
  dataToCalculate,
}) => {
  // Remove any extra option for each column and add an special type
  const finalColumns = calculateColums(dataToCalculate, columns);

  const finalRows = columns.reduce(
    reduceFunction(data, dataToCalculate),
    // Default value with a defined rowKey
    { rowKey }
  );

  const finalData = {
    ...finalRows,
    [columns[0].key]: rowKey,
  };

  return (
    <RowsContainer
      columns={finalColumns}
      compact={compact}
      data={[finalData]}
      rowUniqueIdentifier="rowKey"
      columnsOrder={columnsOrder}
      style={style}
      nodeType="tfoot"
    />
  );
};

BaseFooter.defaultProps = {
  data: [],
  style: {},
  dataToCalculate: [],
};

BaseFooter.propTypes = {
  compact: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      type: PropTypes.oneOf(['currency', 'date', 'percentage', 'number']),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  reduceFunction: PropTypes.func.isRequired,
  rowKey: PropTypes.string.isRequired,
  dataToCalculate: PropTypes.arrayOf(PropTypes.string),
};

export default BaseFooter;

import React from 'react';
import PropTypes from 'prop-types';

import RowsContainer from '../RowsContainer';

/**
 * @typedef {Object} Props
 * @property {Boolean} compact
 * @property {import('ui-components/table').Column[]} [columns]
 * @property {string[]} columnsOrder Collection that determines which columns to render
 * @property {Object[]} [data] The actual table data
 * @property {string} rowUniqueIdentifier Data attribute to be used as id
 * @param {Props} props
 */
const Body = ({
  columns,
  compact,
  data,
  rowUniqueIdentifier,
  columnsOrder,
  style,
  alternateLinkStyle,
}) => (
  <RowsContainer
    alternateLinkStyle={alternateLinkStyle}
    columns={columns}
    compact={compact}
    data={data}
    rowUniqueIdentifier={rowUniqueIdentifier}
    columnsOrder={columnsOrder}
    style={style}
    nodeType="tbody"
  />
);

Body.defaultProps = {
  data: [],
  style: {},
  alternateLinkStyle: false,
};

Body.propTypes = {
  compact: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      type: PropTypes.oneOf(['currency', 'date', 'percentage', 'number']),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  rowUniqueIdentifier: PropTypes.string.isRequired,
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.shape({
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  alternateLinkStyle: PropTypes.bool,
};

export default Body;

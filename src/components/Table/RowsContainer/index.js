import React from 'react';
import PropTypes from 'prop-types';

import Row from '../Row';

/**
 * @typedef {Object} Props
 * @property {Boolean} compact
 * @property {import('ui-components/table').Column[]} [columns]
 * @property {string[]} columnsOrder Collection that determines which columns to render
 * @property {Object[]} [data] The actual table data
 * @property {string} rowUniqueIdentifier Data attribute to be used as id
 * @property {string} nodeType The type of the container, it can be a tfooter or a tbody
 * @param {Props} props
 */
const RowsContainer = ({
  columns,
  compact,
  data,
  rowUniqueIdentifier,
  columnsOrder,
  alternateLinkStyle,
  nodeType: NodeType,
}) => (
  <NodeType>
    {data.map((row) => {
      const customRow = { ...row, selected: false };
      const handleClick = (selectedRow) => {
        return { ...selectedRow, selected: !selectedRow.selected };
      };
      return (
        <Row
          {...customRow}
          alternateLinkStyle={alternateLinkStyle}
          key={row[rowUniqueIdentifier]}
          columns={columns}
          compact={compact}
          columnsOrder={columnsOrder}
          handleClick={handleClick}
        />
      );
    })}
  </NodeType>
);

RowsContainer.defaultProps = {
  data: [],
  alternateLinkStyle: false,
};

RowsContainer.propTypes = {
  compact: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      type: PropTypes.oneOf([
        'currency',
        'date',
        'percentage',
        'number',
        'emptyTotal',
      ]),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
  rowUniqueIdentifier: PropTypes.string.isRequired,
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  nodeType: PropTypes.oneOf(['tfoot', 'tbody']).isRequired,
  alternateLinkStyle: PropTypes.bool,
};

export default RowsContainer;

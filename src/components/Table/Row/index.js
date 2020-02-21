import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { formatValue } from '@credijusto/ui-components';

import { getColumnAlignment } from '../utils';

import { getFinalLink } from './utils';
import { StyledRow, StyledCell, ColouredLink } from '../styled';

export const config = {
  testId: 'table-row-test',
};

const EMPTY_CONTENT_LABEL = 'N/A';

/**
 * Formats the cell content depending on the cell type
 * @param {string|number} cellValue
 * @param {Object} options
 */
const formatContent = (
  cellValue,
  { isCurrency, isNumber, isDisplayDate, isPercentage, isTotal }
) => {
  const isUndefinedTotal =
    isTotal && (cellValue === null || typeof cellValue === 'undefined');
  return isUndefinedTotal
    ? '-'
    : formatValue(cellValue, {
        isCurrency,
        isDisplayDate,
        isNumber: isNumber || isPercentage,
      });
};

/**
 * @typedef {Object} Props
 * @property {Boolean} compact
 * @property {import('ui-components/table').Column[]} [columns]
 * @property {string[]} columnsOrder Collection that determines which columns to render
 * @property {Object} row
 * @property {string} linkColor
 * @param {Props} props
 */
const Row = ({
  columns,
  compact,
  columnsOrder,
  alternateLinkStyle,
  linkColor,
  handleClick,
  ...row
}) => (
  <StyledRow onClick={() => handleClick(row)}>
    {columnsOrder.map((columnKey) => {
      // find the column to render first by id, then by key
      const { cellRender, type, key, linkTo, align, isTotal } = columns.find(
        ({ key: searchKey, id }) => id === columnKey || searchKey === columnKey
      );

      const isCurrency = type === 'currency';
      const isNumber = type === 'number';
      const isDisplayDate = type === 'date';
      const isPercentage = type === 'percentage';

      const cellContent = formatContent(row[key], {
        isCurrency,
        isNumber,
        isDisplayDate,
        isPercentage,
        isTotal,
      });

      const WrapperComponent = linkTo ? ColouredLink : Fragment;
      const wrapperComponentProps = linkTo
        ? {
            to: getFinalLink(linkTo, row),
            linkColor: alternateLinkStyle ? 'var(--color-text)' : linkColor,
            alternateLinkStyle,
          }
        : {};

      const columnAlign = align || getColumnAlignment({ type });

      return (
        <StyledCell
          key={columnKey}
          isCompact={compact}
          isTotal={isTotal}
          isNumber={isNumber}
          isPercentage={isPercentage}
          isNull={cellContent === EMPTY_CONTENT_LABEL}
          isCurrency={isCurrency}
          textAlign={columnAlign}
          isDate={isDisplayDate}
          data-testid={`${config.testId}-${columnKey}`}
        >
          <WrapperComponent {...wrapperComponentProps}>
            {cellRender ? cellRender(row[key], row) : cellContent}
          </WrapperComponent>
        </StyledCell>
      );
    })}
  </StyledRow>
);

Row.defaultProps = {
  columns: [],
  compact: false,
  linkColor: '#a089d6',
  alternateLinkStyle: false,
};

Row.propTypes = {
  compact: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
      type: PropTypes.oneOf([
        'currency',
        'number',
        'date',
        'percentage',
        'emptyTotal',
      ]),
      cellRender: PropTypes.func,
      linkTo: PropTypes.string,
      align: PropTypes.oneOf(['right', 'left', 'center']),
      isTotal: PropTypes.bool,
    })
  ),
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  linkColor: PropTypes.string,
  alternateLinkStyle: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default Row;

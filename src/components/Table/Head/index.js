import React from 'react';
import PropTypes from 'prop-types';

import { getColumnAlignment } from '../utils';
import {
  StyledHead,
  StyledCellHead,
  StyledCellHeadContainer,
  StyledCellHeadIconsContainer,
  StyledSortIcon,
} from '../styled';

export const config = {
  testId: 'table-head-test',
};

/**
 * @typedef {Object} Props
 * @property {Boolean} compact
 * @property {import('ui-components/table').Column[]} columns
 * @property {string[]} columnsOrder Collection that determines which columns to render
 * @property {boolean} isHeadless To hide the thead element
 *
 * @param {Props} props
 */

const Head = ({
  columns,
  compact,
  columnsOrder,
  isHeadless,
  onClickHeader,
  sortBy,
  headRef,
}) => {
  const isDesc = sortBy.startsWith('-');
  const sortKey = isDesc ? sortBy.slice(1) : sortBy;

  return (
    <StyledHead ref={headRef} isHeadless={isHeadless}>
      <tr>
        {columnsOrder.map((columnKey) => {
          const column = columns.find(
            ({ key, id }) => id === columnKey || key === columnKey
          );
          const { label, align, sortable, key } = column;

          const columnAlign = align || getColumnAlignment(column);

          return (
            <StyledCellHead
              key={columnKey}
              isSorted={sortKey && sortKey === key}
              isSortable={sortable}
              isCompact={compact}
              textAlign={columnAlign}
              data-testid={config.testId}
              onClick={sortable ? () => onClickHeader(key) : () => null}
            >
              <StyledCellHeadContainer
                flexDirection={columnAlign === 'right' ? 'row-reverse' : 'row'}
              >
                {label}
                {sortable && (
                  <StyledCellHeadIconsContainer>
                    <StyledSortIcon icon="chevron-down" customSize="14px" />
                    <StyledSortIcon icon="chevron-up" customSize="14px" />
                  </StyledCellHeadIconsContainer>
                )}
              </StyledCellHeadContainer>
            </StyledCellHead>
          );
        })}
      </tr>
    </StyledHead>
  );
};

Head.propTypes = {
  compact: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      type: PropTypes.oneOf(['currency', 'date', 'percentage', 'number']),
      align: PropTypes.oneOf(['right', 'left', 'center']),
      id: PropTypes.string,
    })
  ).isRequired,
  columnsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  isHeadless: PropTypes.bool,
  onClickHeader: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
  headRef: PropTypes.shape({ current: PropTypes.object }),
};

Head.defaultProps = {
  isHeadless: false,
  sortBy: '',
  headRef: undefined,
};

export default Head;

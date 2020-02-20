import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { Emptiness, Loading, ViewLoader } from '@credijusto/ui-components';

import CJCheckbox from 'components/CJCheckbox';
import Head from './Head';
import Body from './Body';
import Footer from './Footer';
import { sortData } from './utils';

import {
  StyledWrapper,
  StyledTable,
  StyledRow,
  StyledCellHead,
  StyledCell,
} from './styled';

const defaultEmptinessMessage = 'No hay elementos';

/**
 * @typedef {Object} Column
 * @property {string} [key] Data property to be used as the row value
 * @property {string} [label] Column title
 * @property {'currency' | 'number' | 'date' | 'percentage'} [type] Cell type, it can be any of
 * these values
 * @property {Function} [cellRender] Special render function for the column values
 */

/**
 * @typedef {Object} Props
 * @property {bool} [loading]
 * @property {bool} [compact] Will render smaller items in table for data-heavy tables
 * @property {Column[]} columns Columns configuration
 * @property {Object[]} [data] The actual table data
 * @property {React.node} [emptiness] Special node to be render in case of the table is empty
 * @property {string[]} [columnsOrder] Collection that determines which columns to render
 * @property {string} rowUniqueIdentifier Data attribute to be used as id
 * @property {boolean} isHeadless To hide the thead element
 * @param {Props} props
 */

/**
 * The state machine that tells the Table which new state for sortby is needed
 * @param {string} currentKey
 * @param {string} selectedKey
 */
const getNewSortBy = (currentKey, selectedKey) => {
  const isDesc = currentKey.startsWith('-');
  const currentSortKey = isDesc ? currentKey.slice(1) : currentKey;

  if (currentSortKey !== selectedKey) {
    return selectedKey;
  }

  return isDesc ? '' : `-${selectedKey}`;
};

/**
 * A table component, used to display large amounts of data
 * @param {Props} props
 */
const Table = ({
  loading,
  compact,
  columns,
  data,
  emptiness,
  columnsOrder,
  rowUniqueIdentifier,
  isHeadless,
  height,
  maxHeight,
  totals,
  averages,
  alternateLinkStyle,
}) => {
  const headRef = useRef(null);

  const [sortBy, setSortBy] = useState('');
  const [newColumns, setNewColumns] = useState(columns);

  // Add CJCheckbox as a first column
  useEffect(
    () => {
      const checkedColumn = {
        key: 'here',
        cellRender: () => <CJCheckbox name="default_checked" value />,
      };
      const arr = [...newColumns];
      arr.unshift(checkedColumn);
      setNewColumns(arr);
    },
    [columns]
  );
  const sortedData = useMemo(() => sortData(data, sortBy, columns), [
    data,
    sortBy,
    columns,
  ]);

  /**
   * Handlers used to keep the header fixed when the user is scrolling the table
   * with a limited height
   */
  const handleHeadScroll = (e) => {
    headRef.current.style.transform = `translateY(${e.target.scrollTop}px)`;
  };

  const handleSortBy = useCallback(
    (newSortBy) => {
      setSortBy((prevSortBy) => getNewSortBy(prevSortBy, newSortBy));
    },
    [setSortBy]
  );

  const columnsOrderToRender = useMemo(
    () => columnsOrder || newColumns.map(({ key, id }) => id || key),
    [columnsOrder, newColumns]
  );

  // Return loading if item is loading
  if (loading && data.length === 0) return <Loading />;

  // If it's not loading and there's 0 rows, return either a provided empty state or a default one
  if (!loading && data.length === 0) {
    return <Emptiness message={emptiness || defaultEmptinessMessage} />;
  }

  const formatData = (originalData) => {
    return originalData.map((item) => {
      const modifiedItem = {
        here: 'true',
      };
      return { ...item, ...modifiedItem };
    });
  };

  // If not loading and at least 1 row, return the table
  return (
    <ViewLoader loading={loading}>
      <StyledWrapper
        onScroll={handleHeadScroll}
        data-testid="cj-table-wrapper"
        height={height}
        maxHeight={maxHeight}
      >
        <StyledTable>
          <Head
            headRef={headRef}
            sortBy={sortBy}
            columns={newColumns}
            compact={compact}
            columnsOrder={columnsOrderToRender}
            isHeadless={isHeadless}
            onClickHeader={handleSortBy}
          />
          <Body
            alternateLinkStyle={alternateLinkStyle}
            columns={newColumns}
            compact={compact}
            data={formatData(sortedData)}
            columnsOrder={columnsOrderToRender}
            rowUniqueIdentifier={rowUniqueIdentifier}
          />
          <Footer
            columns={setNewColumns}
            compact={compact}
            columnsOrder={columnsOrderToRender}
            totals={totals}
            averages={averages}
            data={formatData(sortedData)}
          />
        </StyledTable>
      </StyledWrapper>
    </ViewLoader>
  );
};

Table.Styled = { StyledRow, StyledCellHead, StyledCell, StyledTable };

Table.defaultProps = {
  data: [],
  columns: [],
  loading: false,
  compact: false,
  emptiness: undefined,
  columnsOrder: undefined,
  isHeadless: false,
  height: '',
  maxHeight: '',
  totals: [],
  averages: [],
  alternateLinkStyle: false,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node.isRequired,
      type: PropTypes.oneOf(['currency', 'number', 'date', 'percentage']),
      cellRender: PropTypes.func,
    })
  ),
  columnsOrder: PropTypes.arrayOf(PropTypes.string),
  compact: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.any),
  emptiness: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.string]),
  isHeadless: PropTypes.bool,
  loading: PropTypes.bool,
  rowUniqueIdentifier: PropTypes.string.isRequired,
  totals: PropTypes.arrayOf(PropTypes.string),
  averages: PropTypes.arrayOf(PropTypes.string),
  alternateLinkStyle: PropTypes.bool,
};

export default Table;

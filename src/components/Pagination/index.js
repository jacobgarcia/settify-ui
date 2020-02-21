/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import UIPagination from './UIPagination';

const getTotalPages = ({ totalItems, itemsPerPage }) =>
  Math.ceil(totalItems / itemsPerPage);

const Pagination = ({ currentPage, totalItems, itemsPerPage, disabled }) => {
  const startItem = (+currentPage - 1) * itemsPerPage + 1;
  const endItem =
    totalItems <= +currentPage * itemsPerPage
      ? totalItems
      : +currentPage * itemsPerPage;
  return (
    <UIPagination
      totalResults={totalItems}
      showingResults={[startItem, endItem]}
      totalPages={getTotalPages({ totalItems, itemsPerPage })}
      disabled={disabled}
    />
  );
};

Pagination.defaultProps = {
  currentPage: 1,
  disabled: false,
  itemsPerPage: 10,
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  disabled: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number.isRequired,
};

export default Pagination;

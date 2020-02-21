/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { Info } from '@credijusto/ui-components';
import PaginationLink from '../PaginationLink';
import Ellipsis from '../Ellipsis';

import '../style.pcss';

const MIN_FIXED_PAGES = 6; // Renders all pages instead of ellipsing, MINIMUM IS 6
const ELLIPSIS = 'ellipsis';
const IS_TWO_NUMBERS = (props, propName, componentName) => {
  const { showingResults } = props;
  if (
    !Array.isArray(showingResults) ||
    showingResults.length !== 2 ||
    !showingResults.every(Number.isInteger)
  ) {
    return new Error(
      `${propName} suplied to ${componentName} should be an array of two numbers.`
    );
  }
  return null;
};

export const getPagesToRender = (totalPages, currentPage) => {
  switch (true) {
    case totalPages < MIN_FIXED_PAGES: // Case if there are less than 6 pages
      return [...new Array(totalPages)].map((_, i) => i + 1);
    case currentPage <= 3: // Case for rendering first 3 pages if current page is on the verge
      return [1, 2, 3, 4, ELLIPSIS, totalPages];
    case totalPages - currentPage > 2: // Case for rendering pages if current page is on the middle
      return [
        1,
        ELLIPSIS,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        ELLIPSIS,
        totalPages,
      ];
    case totalPages - currentPage <= 2: // Case for rendering last 3 pages if current page is one
      return [
        1,
        ELLIPSIS,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    default:
      return [];
  }
};

const UIPagination = ({
  totalPages,
  location,
  totalResults,
  showingResults,
  disabled,
}) => {
  const { page: currentPage = 1 } = queryString.parse(location.search);
  const pagesToRender = getPagesToRender(totalPages, +currentPage);

  return (
    <>
      {!!totalResults && showingResults.length === 2 && (
        <Info
          text={[
            `Showing results from ${showingResults[0]} to ${showingResults[1]}`,
            `${totalResults} results`,
          ]}
        />
      )}
      <nav
        className="credijusto_pagination"
        aria-label="pagination"
        data-testid="pagination"
      >
        <ul className="credijusto_pagination--pages">
          {pagesToRender.map((page, i) =>
            page === ELLIPSIS ? (
              <Ellipsis key={`${ELLIPSIS}${i}`} />
            ) : (
              <PaginationLink
                key={page}
                page={page}
                isCurrent={page === +currentPage}
                disabled={disabled}
              />
            )
          )}
        </ul>
        <ul className="credijusto_pagination--nav_buttons">
          <PaginationLink
            page={+currentPage - 1}
            text="Back"
            disabled={+currentPage === 1 || disabled}
          />
          <PaginationLink
            page={+currentPage + 1}
            text="Next"
            disabled={+currentPage === totalPages || disabled}
          />
        </ul>
      </nav>
    </>
  );
};

UIPagination.propTypes = {
  disabled: PropTypes.bool,
  totalPages: PropTypes.number.isRequired,
  totalResults: PropTypes.number,
  showingResults: IS_TWO_NUMBERS,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

UIPagination.defaultProps = {
  totalResults: null,
  showingResults: [0, 0],
  disabled: false,
};

export { MIN_FIXED_PAGES, ELLIPSIS, IS_TWO_NUMBERS };

export default withRouter(UIPagination);

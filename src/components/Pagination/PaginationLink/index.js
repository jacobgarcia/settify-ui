import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import queryString from 'query-string';

const PaginationLink = ({ page, text, location, isCurrent, disabled }) => {
  const { page: _, ...otherQuerys } = queryString.parse(location.search);
  const query = queryString.stringify({ page, ...otherQuerys });
  return (
    <li>
      <Link
        to={`${location.pathname}?${query}`}
        className={classNames(
          'credijusto_pagination--link',
          { 'credijusto_pagination--link-text': !!text },
          { 'credijusto_pagination--link-current': isCurrent || disabled }
        )}
      >
        {text || page}
      </Link>
    </li>
  );
};

PaginationLink.propTypes = {
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  text: PropTypes.string,
  isCurrent: PropTypes.bool,
  disabled: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};

PaginationLink.defaultProps = {
  text: '',
  isCurrent: false,
  disabled: false,
};

export default withRouter(PaginationLink);

import React from 'react';
import PropTypes from 'prop-types';

import './style.pcss';

const AppFooter = ({ companySite }) => (
  <div className="credijusto_footer">
    <div className="credijusto_footer--wrapper">
      <p className="credijusto_footer--copyright">
        <a href={companySite} className="credijusto_footer--copyright_link">
          Settify
        </a>
        &copy;
        {` ${new Date().getFullYear()}. All rights reserved.`}
      </p>
    </div>
  </div>
);

AppFooter.propTypes = {
  companySite: PropTypes.string,
};
AppFooter.defaultProps = {
  companySite: process.env.REACT_APP_COMPANY_SITE,
};

export default AppFooter;

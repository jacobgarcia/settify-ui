import React from 'react';
import PropTypes from 'prop-types';

import BaseFooter from './BaseFooter';

import { reduceTotals, reduceAverages } from '../utils';

const Footer = ({ totals, averages, ...props }) => {
  return (
    <>
      {totals.length > 0 && (
        <BaseFooter
          reduceFunction={reduceTotals}
          dataToCalculate={totals}
          rowKey="Totales"
          {...props}
        />
      )}
      {averages.length > 0 && (
        <BaseFooter
          reduceFunction={reduceAverages}
          dataToCalculate={averages}
          rowKey="Promedio"
          {...props}
        />
      )}
    </>
  );
};

Footer.defaultProps = {
  totals: [],
  averages: [],
};

Footer.propTypes = {
  totals: PropTypes.arrayOf(PropTypes.string),
  averages: PropTypes.arrayOf(PropTypes.string),
};

export default Footer;

import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

const ChartPie = props => {
  return <Pie {...props} />;
};

ChartPie.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
};

export default ChartPie;

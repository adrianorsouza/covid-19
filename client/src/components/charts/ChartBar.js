import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const ChartBar = props => {
  return <Bar {...props} />;
};

ChartBar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ChartBar;

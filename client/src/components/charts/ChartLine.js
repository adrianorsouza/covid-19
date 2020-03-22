import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ChartLine = props => {
  return <Line {...props} />;
};

ChartLine.propTypes = {
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
};

export default ChartLine;

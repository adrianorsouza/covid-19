import React from 'react';
import PropTypes from 'prop-types';
import Chart from './charts/Chart';
import ResponseError from './ResponseError';
import { chartOptions, parseChartData } from '../utils/chart-config';

const ChartWorldCases = ({ chartWorld }) => {
  const { status, response } = chartWorld || {};
  const { data } = response || [];

  if (status === 'ERROR') {
    return <ResponseError response={response} />;
  }

  const chart = parseChartData(data, 'world');

  return (
    <>
      <Chart.Line data={chart} options={chartOptions} />
    </>
  );
};

ChartWorldCases.propTypes = {
  chartWorld: PropTypes.object.isRequired,
};

export default ChartWorldCases;

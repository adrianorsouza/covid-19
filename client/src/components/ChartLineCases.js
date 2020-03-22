import React from 'react';
import PropTypes from 'prop-types';
import Chart from './charts/Chart';
import ResponseError from './ResponseError';
import { parseChartData, chartOptions } from '../utils/chart-config';

const ChartLineCases = ({ chartDaily }) => {
  const { status, response } = chartDaily || {};
  const { data } = response || [];

  if (status === 'ERROR') {
    return <ResponseError response={response} />;
  }

  const chart = parseChartData(data, 'country');

  return (
    <>
      <Chart.Line data={chart} options={chartOptions} />
    </>
  );
};

ChartLineCases.propTypes = {
  chartDaily: PropTypes.object.isRequired,
};

export default ChartLineCases;

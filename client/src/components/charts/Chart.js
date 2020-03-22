import React from 'react';
import ChartBar from './ChartBar';
import ChartDonut from './ChartDonut';
import ChartLine from './ChartLine';
import ChartPie from './ChartPie';
import './chart-options';

export default class Chart extends React.Component {
  static Line = ChartLine;
  static Bar = ChartBar;
  static Pie = ChartPie;
  static Donut = ChartDonut;

  render() {
    return null;
  }
}

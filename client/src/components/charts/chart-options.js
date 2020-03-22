import { defaults } from 'react-chartjs-2';
import merge from 'lodash.merge';
import colors from './chart-colors';

require('./chart-js');

merge(defaults, {
  global: {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 5,
    },
    defaultFontFamily: 'initial',
    defaultFontColor: colors.gray['700'],
    defaultFontSize: 16,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        boxWidth: 20
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'average',
      intersect: true,
    },
    elements: {
      point: {
        radius: 3,
      },
      line: {
        tension: 1,
        borderWidth: 2,
        fill: true,
      },
      rectangle: {
        backgroundColor: colors.theme['warning'],
      },
      arc: {
        backgroundColor: colors.theme['primary'],
        borderColor: colors.white,
        borderWidth: 1,
      },
    },
  },
  line: {
    scales: {
      yAxes: [],
      xAxes: []
    },
  },
  bar: {},
  pie: {},
  doughnut: {},
});

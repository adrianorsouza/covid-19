import dayjs from 'dayjs';
import colors from '../components/charts/chart-colors';
import { formatNumber } from './helpers';

export const parseChartData = (data, type) => {
  if (!data || typeof data === 'string' || !data.length) return {};

  const labels = [];
  const datasets = [];

  data.forEach((item, index) => {
    const date = dayjs(item.updated_at).format('DD/MMM');
    const today = dayjs().format('DD/MMM');
    if (date === today) {
      labels.push('Hoje');
    } else {
      labels.push(dayjs(item.updated_at).format('DD/MMM'));
    }
  });

  if (type === 'country') {
    datasets.push({
      label: 'Casos Confirmados',
      data: data.map(item => item['confirmed']),
      backgroundColor: colors.blue,
      borderColor: colors.blue,
      fill: false,
    });
    datasets.push({
      label: 'Recuperado',
      data: data.map(item => item['recovered']),
      backgroundColor: colors.green,
      borderColor: colors.green,
      fill: false,
    });

    datasets.push({
      label: 'Mortes',
      data: data.map(item => item['deaths']),
      backgroundColor: colors.red,
      borderColor: colors.red,
      fill: false,
    });
  } else if (type === 'world') {
    datasets.push({
      label: 'China',
      data: data.map(item => item['mainlandChina']),
      backgroundColor: colors.red,
      borderColor: colors.red,
      fill: false,
    });

    datasets.push({
      label: 'Resto do Mundo',
      data: data.map(item => item['otherLocations']),
      backgroundColor: colors.blue,
      borderColor: colors.blue,
      fill: false,
    });
    datasets.push({
      label: 'Total Recuperados',
      data: data.map(item => item['totalRecovered']),
      backgroundColor: colors.green,
      borderColor: colors.green,
      fill: false,
    });
  }

  return {
    labels: labels,
    datasets,
  };
};

export const chartOptions = {
  type: 'line',
  maintainAspectRatio: true,
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Dias corridos',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Pessoas Infectadas',
        },
        ticks: {
          // suggestedMin: -10000,
          // suggestedMax: 60000,
          callback: (value) => formatNumber(value),
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.5,
      lineTension: true,
      // steppedLine: true,
      // spanGaps: true,
      showLines: false,
      borderWidth: 2,
    },
  },
  legend: {
    labels: {
      boxWidth: 5,
      padding: 3
    }
  }
};

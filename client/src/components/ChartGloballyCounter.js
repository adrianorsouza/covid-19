/** ========================================================================
 * Project     : covid-19
 * Component   : ChartGloballyCounter
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-23 21:39
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import Chart from './charts/Chart';
import Grid from '@material-ui/core/Grid';
import CardNumber from './CardNumber';

const ChartGloballyCounter = props => {
  const {
    data: { response },
  } = props;

  const { confirmed, recovered, deaths } = (response && response.data) || {};

  const pieData = () => {
    if (!response) return {};

    return {
      datasets: [
        {
          data: [confirmed, recovered, deaths],
          backgroundColor: ['#2979ff', '#00c853', '#d50000'],
        },
      ],
      labels: ['Confirmados', 'Recuperados', 'Mortes'],
    };
  };

  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={6} sm={6}>
        <Chart.Pie
          data={pieData()}
          options={{
            maintainAspectRatio: true,
            legend: {
              display: false,
            },
          }}
        />
      </Grid>
      <Grid item xs={6} sm={6}>
        <CardNumber
          color="confirmed.main"
          label="confirmados"
          number={confirmed}
        />
        <CardNumber
          color="recovered.main"
          label="recuperados"
          number={recovered}
          rate={recovered && ((recovered / confirmed) * 100).toFixed(1)}
        />
        <CardNumber
          color="deaths.main"
          label="mortos"
          number={deaths}
          rate={confirmed && ((deaths / confirmed) * 100).toFixed(1)}
        />
      </Grid>
    </Grid>
  );
};

export default ChartGloballyCounter;

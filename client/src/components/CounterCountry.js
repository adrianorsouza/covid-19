/** ========================================================================
 * Project     : covid-19
 * Component   : CounterCountry
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-20 18:36
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ResponseError from './ResponseError';
import BoxCounter from './BoxCounter';

const CounterCountry = ({ counters: { status, response } }) => {
  const { confirmed, recovered, deaths } = (response && response.data) || {};

  return (
    <>
      {status === 'ERROR' && <ResponseError response={response} />}
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <BoxCounter
            label="Confirmados"
            value={confirmed}
            color="blue"
            status={status}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <BoxCounter
            label="Recuperados"
            value={recovered}
            color="green"
            status={status}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <BoxCounter
            label="Mortes"
            value={deaths}
            color="red"
            status={status}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CounterCountry;

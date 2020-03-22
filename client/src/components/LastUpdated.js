/** ========================================================================
 * Project     : covid-19
 * Component   : LastUpdated
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-21 17:05
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import dayjs from 'dayjs';

const LastUpdated = ({ value }) => {
  let lastUpdate;
  if (value) {
    const { response } = value;
    const date =  ((response && response.updated_at) || (response && response.data && response.data.updated_at)) || null;

    lastUpdate = date && dayjs(date).format('DD/MM/YYYY [às] HH[h]mm');
  }

  return <small>{(lastUpdate && `Atualizado em ${lastUpdate}`) || '--'}</small>;
};

export default LastUpdated;

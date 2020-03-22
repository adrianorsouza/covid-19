/** ========================================================================
 * Project     : covid-19
 * Component   : ResponsePending
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-21 12:42
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import Loader from './Loader';

const ResponsePending = ({ status }) => {
  return (
    <>
      {(status === 'FETCHING' && (
        <div className="text-center">
          <Loader show={true} />{' '}
        </div>
      )) ||
        null}
    </>
  );
};

export default ResponsePending;

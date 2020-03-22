/** ========================================================================
 * Project     : covid-19
 * Component   : ResponseError
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-21 12:09
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { app } from '../config';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const ResponseError = ({ response }) => {

  const  classes = useStyles();
  let message;
  if (response && response.error === 404) {
    message = 'Recurso não encontrado no database.'
  }

  return (
    <div className={`${classes.root} ${classes.error}`}>
      <p>{message || `Ocorreu um erro ao carregar os dados.`}</p>
      {app.env === 'development' && <small>{JSON.stringify(response, null, 2)}</small>}
    </div>
  );
};

ResponseError.propTypes = {
  response: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ResponseError;

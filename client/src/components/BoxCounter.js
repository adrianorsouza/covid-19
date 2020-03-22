/** ========================================================================
 * Project     : covid-19
 * Component   : BoxCounter
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-21 21:17
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { formatNumber } from '../utils/helpers';
import Loader from './Loader';

const PaperCustom = withStyles(theme => ({
  root: {
    marginTo: theme.spacing(2),
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}))(Paper);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'block',
    whiteSpace: 'nowrap',
  },
  red: {
    color: theme.palette.error.main,
  },
  green: {
    color: theme.palette.success.main,
  },
  blue: {
    color: theme.palette.info.main,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
}));

const BoxCounter = ({ color, value, label, status }) => {
  const classes = useStyles();

  return (
    <PaperCustom>
      <Box
        fontSize={{ xs: 'h4.fontSize', sm: 'h2.fontSize' }}
        className="text-center"
        p={{ xs: 0.2, sm: 1 }}
      >
        <h2 className={classes[color]}>
          {(status === 'FETCHING' && <Loader show={true} />) ||
            formatNumber(value) ||
            0}
        </h2>
        <Typography className={classes.uppercase}>
          <strong>{label}</strong>
        </Typography>
      </Box>
    </PaperCustom>
  );
};

BoxCounter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOf(['green', 'blue', 'red']),
  status: PropTypes.string,
};

export default BoxCounter;

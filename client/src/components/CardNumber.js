/** ========================================================================
 * Project     : covid-19
 * Component   : CardNumber
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-25 12:34
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import Box from '@material-ui/core/Box';
import { formatNumber } from '../utils/helpers';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const CardNumberWrapper = styled.div`
  h2,
  h3 {
    small {
      margin: 0;
      display: block;
    }
  }
`;

const CardNumber = ({ number, label, color, rate }) => {
  return (
    <Box color={color}>
      <CardNumberWrapper>
        <Box component="h2" fontSize={{ xs: 'h2.fontSize', sm: 'h1.fontSize' }}>
          {formatNumber(number) || 0}
          <Typography component="small">
            <strong>{label}</strong>
            {rate && rate >= 1 && <strong>{` (${rate && rate}%)`}</strong>}
          </Typography>
        </Box>
      </CardNumberWrapper>
    </Box>
  );
};

CardNumber.defaultProps = {
  color: 'recovered.main',
};

export default CardNumber;

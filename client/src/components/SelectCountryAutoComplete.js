/** ========================================================================
 * Project     : covid-19
 * Component   : SelectCountryAutoComplete
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-23 18:39
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import { countryToFlag } from '../utils/helpers';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const SelectCountryAutoComplete = ({country, countries, handleChange}) => {
  const classes = useStyles();
  return (
    <Autocomplete
      style={{ marginBottom: '1rem' }}
      options={countries}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      onChange={(e, value) => handleChange(value)}
      getOptionLabel={option =>
        // `${countryToFlag(option.value)} ${option.label} (${option.value})`
        `${option.label} (${option.value})`
      }
      value={country}
      renderOption={option => (
        <React.Fragment>
          <span>{countryToFlag(option.value)}</span>
          {option.label} ({option.value})
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Selecione outro País"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default SelectCountryAutoComplete;

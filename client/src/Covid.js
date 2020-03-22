/** ========================================================================
 * Project     : covid-19
 * Component   : Covid
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-20 22:50
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */
import React, { useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import ChartLineCases from './components/ChartLineCases';
import CounterCountry from './components/CounterCountry';
import useApiRequest from './hooks/useApiRequest';
import { GlobalContext } from './context/GlobalState';
import ChartWorldCases from './components/ChartWorldCases';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { countryToFlag } from './utils/helpers';
import TableCountryList from './components/TableCountryList';
import LastUpdated from './components/LastUpdated';
import Box from '@material-ui/core/Box';
import Loader from './components/Loader';
import ResponsePending from './components/ResponsePending';
import { url } from './config';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const PaperCustom = withStyles(theme => ({
  root: {
    marginTo: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))(Paper);

const Wrapper = styled.div`
  margin: 1rem 0;
  .text-center {
    text-align: center;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    margin-bottom: 0;
  }
  small {
    display: block;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  max-height: 700px;
`;

const Covid = () => {
  const classes = useStyles();
  const { country, countries, handleCountryChange } = useContext(GlobalContext);
  const [counters, fetchCounters] = useApiRequest(
    url.api.counters(country.value)
  );
  const [chartDaily, fetchDaily] = useApiRequest('/api/daily.json');
  const [chartWorld, fetchWorld] = useApiRequest('/api/daily/world.json');
  const [responseCountries, fetchDataCountries] = useApiRequest(
    `/api/countries.json`
  );

  if (!counters.status) {
    fetchCounters();
  }

  if (!chartDaily.status) {
    fetchDaily();
  }

  if (!chartWorld.status && country.value !== 'BR') {
    fetchWorld();
  }

  if (!responseCountries.status) {
    fetchDataCountries();
  }

  const selectCountry = iso => {
    if (!iso) return;
    handleCountryChange(iso.value);
    fetchCounters(url.api.counters(iso.value));
  };

  return (
    <Wrapper>
      <Loader />
      <PageHeader>
        <Box
          m={0}
          p={{ xs: 1, sm: 2 }}
          component="h2"
          className="text-center"
          fontSize={{ xs: 'h3.fontSize', sm: 'h2.fontSize' }}
          uppercase={'uppercase'}
        >
          Casos Coronavírus (COVID-19) -{' '}
          <img
            src={`/images/flags/${country.value.toLowerCase()}.svg`}
            width={30}
            alt=""
            style={{ boxShadow: '0px 1px 3px 0px rgba(0,0,0,.1)' }}
          />{' '}
          {country.label}
        </Box>
        <LastUpdated value={counters} />
      </PageHeader>

      <Box component="div">
        <Autocomplete
          style={{ marginBottom: '1rem' }}
          options={countries}
          classes={{
            option: classes.option,
          }}
          autoHighlight
          onChange={(e, value) => selectCountry(value)}
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
              label="Selecionar País"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Box>

      <Box mt={3}>
        <CounterCountry counters={counters} />
      </Box>

      <Box mt={3} mb={3}>
        <PaperCustom>
          <Box
            m={0}
            p={{ xs: 1, sm: 2 }}
            component="h2"
            className="text-center"
            fontSize={{ xs: 'h3.fontSize', sm: 'h2.fontSize' }}
          >
            Evolução dos casos no{' '}
            {(country.value === 'BR' && `Brasil`) || 'Mundo'}
            <ResponsePending status={chartWorld.status || chartDaily.status} />
          </Box>
          <ChartWrapper>
            {(country.value === 'BR' && (
              <ChartLineCases chartDaily={chartDaily} />
            )) || <ChartWorldCases chartWorld={chartWorld} />}
          </ChartWrapper>
        </PaperCustom>
      </Box>

      <Box mt={3}>
        <PaperCustom elevation={1}>
          <Box className="text-center">
            <Box
              m={0}
              p={{ xs: 1, sm: 2 }}
              component="h2"
              fontSize={{ xs: 'h3.fontSize', sm: 'h2.fontSize' }}
            >
              Casos ao redor do mundo
            </Box>
            <LastUpdated value={responseCountries} />
            <ResponsePending status={responseCountries.status} />
          </Box>
          <ChartWrapper>
            <TableCountryList responseCountries={responseCountries} />
          </ChartWrapper>
        </PaperCustom>
      </Box>
    </Wrapper>
  );
};

export default Covid;

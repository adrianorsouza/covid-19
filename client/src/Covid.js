/** ========================================================================
 * Project     : covid-19
 * Component   : Covid
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * Date        : 2020-03-20 22:50
 * ========================================================================
 * Copyright 2020 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */
import React, { useContext } from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { url } from './config';
import Loader from './components/Loader';
import useApiRequest from './hooks/useApiRequest';
import LastUpdated from './components/LastUpdated';
import { GlobalContext } from './context/GlobalState';
import ChartLineCases from './components/ChartLineCases';
import CounterCountry from './components/CounterCountry';
import ChartWorldCases from './components/ChartWorldCases';
import ResponsePending from './components/ResponsePending';
import TableCountryList from './components/TableCountryList';
import ChartGloballyCounter from './components/ChartGloballyCounter';
import SelectCountryAutoComplete from './components/SelectCountryAutoComplete';

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
  const { country, countries, handleCountryChange } = useContext(GlobalContext);
  const [counters, fetchCounters] = useApiRequest();
  const [chartDaily, fetchDaily] = useApiRequest();
  const [chartWorld, fetchWorld] = useApiRequest();
  const [responseCountries, fetchDataCountries] = useApiRequest();
  const [globally, fetchDataGlobally] = useApiRequest();

  if (!counters.status) {
    fetchCounters(url.api.counters(country.value));
  }

  if (!chartDaily.status) {
    fetchDaily(url.api.daily(country.value));
  }

  if (!chartWorld.status) {
    fetchWorld(url.api.dailyWorld);
  }

  if (!responseCountries.status) {
    fetchDataCountries(url.api.countries);
  }

  if (!globally.status) {
    fetchDataGlobally(url.api.globally);
  }

  const selectCountry = iso => {
    if (!iso) return;
    handleCountryChange(iso.value);
    fetchCounters(url.api.counters(iso.value));
    fetchDaily(url.api.daily(iso.value));
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
        <SelectCountryAutoComplete
          country={country}
          countries={countries}
          handleChange={selectCountry}
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
            component="h3"
            className="text-center"
            fontSize={{ xs: 'h5.fontSize', sm: 'h4.fontSize' }}
          >
            Evolução dos casos - {country.label}
            <ResponsePending status={chartWorld.status || chartDaily.status} />
          </Box>
          <ChartWrapper>
            <ChartLineCases chartDaily={chartDaily} />
          </ChartWrapper>
        </PaperCustom>
      </Box>

      <PageHeader>
        <Box
          m={0}
          p={{ xs: 1, sm: 2 }}
          component="h2"
          className="text-center"
          fontSize={{ xs: 'h3.fontSize', sm: 'h2.fontSize' }}
          uppercase={'uppercase'}
        >
          Casos Coronavírus no Mundo
        </Box>
        <LastUpdated value={globally} />
      </PageHeader>

      <Box mt={3} mb={3}>
        <PaperCustom>
          <ChartGloballyCounter data={globally} />
        </PaperCustom>

        <PaperCustom>
          <Box
            m={0}
            p={{ xs: 1, sm: 2 }}
            component="h4"
            className="text-center"
            fontSize={{ xs: 'h5.fontSize', sm: 'h4.fontSize' }}
          >
            Evolução dos casos no mundo
            <ResponsePending status={chartWorld.status || chartDaily.status} />
          </Box>
          <ChartWrapper>
            <ChartWorldCases chartWorld={chartWorld} />
          </ChartWrapper>
        </PaperCustom>
      </Box>

      <PageHeader>
        <Box
          m={0}
          p={{ xs: 1, sm: 2 }}
          component="h2"
          className="text-center"
          fontSize={{ xs: 'h3.fontSize', sm: 'h2.fontSize' }}
          uppercase={'uppercase'}
        >
          Países com casos registrados
        </Box>
        <LastUpdated value={responseCountries} />
      </PageHeader>
      <Box mt={3}>
        <PaperCustom elevation={1}>
          <Box className="text-center">
            <ResponsePending status={responseCountries.status} />
          </Box>
          <ChartWrapper>
            <TableCountryList responseCountries={responseCountries} />
          </ChartWrapper>
        </PaperCustom>
      </Box>
      <Box mt={10} className="text-center">
        <p>
          Dados oficiais atualizados constantemente de acordo com o sistema de
          controle de cada país.
        </p>
        <p>
          <small>
            Desenvolvido em NodeJS, React e PHP. Layout e BackEnd Wrapper API
            por{' '}
            <a
              href="https://adrianorosa.com"
              title="Adriano Rosa"
              target="_blank"
              rel="noreferrer noopener"
            >
              Adriano Rosa
            </a>
            . Data sources fornecido pela Universidade Johns Hopkins University
            - Systems Science and Engineering (CSSE), JSON API por{' '}
            <a
              href="https://covid19.mathdro.id"
              title="Mohamed"
              target="_blank"
              rel="noreferrer noopener"
            >
              Mustadi's.
            </a>
          </small>
        </p>
      </Box>
    </Wrapper>
  );
};

export default Covid;

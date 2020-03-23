import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Container from '@material-ui/core/Container';
import ReactGA from 'react-ga';
import Covid from './Covid';
import { app } from './config';

const App = () => {
  useEffect(() => {
    if (app.env !== 'development') {
      ReactGA.initialize(app.gaTrackingCode, {
        debug: app.env === 'development',
      });
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  });

  return (
    <Layout>
      <Container maxWidth="md">
        <Covid />
      </Container>
    </Layout>
  );
};

export default App;

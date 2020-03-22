import React from 'react';
import Layout from './components/Layout';
import Container from '@material-ui/core/Container';
import Covid from './Covid';

const App = () => {
  return (
    <Layout>
      <Container maxWidth="md">
        <Covid />
      </Container>
    </Layout>
  );
};

export default App;

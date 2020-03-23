import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Head from './Head';
import theme from './theme';
import Header from './Header';
import { GlobalProvider } from '../context/GlobalState';

const Layout = props => {

  return (
    <GlobalProvider>
      <Head>
        <title>COVID-19 Número do infectados em tempo real</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          {props.children}
        </main>
      </ThemeProvider>

    </GlobalProvider>
  );
};

export default Layout;

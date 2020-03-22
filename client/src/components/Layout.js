import React from 'react';
import Head from './Head';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Header';
import { GlobalProvider } from '../context/GlobalState';

const Layout = props => {

  return (
    <GlobalProvider>
      <Head>
        <title>Corona Virus</title>
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

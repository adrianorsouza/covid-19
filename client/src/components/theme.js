import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, green } from '@material-ui/core/colors';

// A custom theme for this app

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    },
  },
  overrides: {
    MuiToolbar: {
      green: {
        background: green.A700
      }
    }
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: [
      'Nunito',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: `3rem`,
    },
    h2: {
      fontSize: `2rem`,
    },
    h3: {
      fontSize: `1.75rem`,
    },
    h4: {
      fontSize: `1.5rem`,
    },
    h5: {
      fontSize: `1rem`,
    },
    h6: {
      fontSize: `3rem`,
    },
    subtitle1: {
      fontSize: `3rem`,
      textAlign: 'center',
    },
    subtitle2: {
      fontSize: `2rem`,
      textAlign: 'center',
    },
    subtitle3: {
      fontSize: `2rem`,
      textAlign: 'center',
    },
    uppercase: {
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: green.A700,
    },
    secondary: {
      main: red.A200,
    },
    success: {
      main: green.A700,
    },
    info: {
      main: blue.A400,
    },
    error: {
      main: red.A700,
    },
    confirmed: {
      main: blue.A400,
    },
    recovered: {
      main: green.A700,
    },
    deaths: {
      main: red.A700,
    },
    background: {
      default: `#ffffff`,
    },
  },
});

export default theme;

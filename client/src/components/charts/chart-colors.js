
const colors = {
  primary: '#5e72e4',
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent',

  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  gray: {
    100: '#f8f9fa',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529',
  },
};

colors.theme = {
  primary: colors.primary,
  secondary: colors.gray[600],
};

export default colors;

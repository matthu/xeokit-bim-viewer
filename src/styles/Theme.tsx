import { createMuiTheme } from '@material-ui/core/styles';

/* Custom Mui Theme */

export const styleTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#03103F',
    },
    secondary: {
      light: '#ffff98',
      main: '#efdd5f',
      dark: '#c5b32c',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#333',
      secondary: '#707070',
    },
    type: 'light',
  },
  typography: {
    // Component titles
    h4: {
      fontSize: '1rem',
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h1: {
      fontSize: '2rem',
    },
  },
});

/* Sizing Theme - for more advanced sizing not found in the Mui theme */

export const sizeTheme = {
  toolbarLarge: '40px',
  toolbarSmall: '35px',
  iconLarge: '32px',
  iconMedium: '30px',
  iconSmall: '27px',
  // Screen size queries
  small: '@media (max-width: 639px)',
  portrait: '@media (max-width: 768px)',
  mobile: '@media (max-width: 813px)',
  medium: '@media (max-width: 1047px)',
  large: '@media (min-width: 1048px)',
};

import { ThemeOptions } from '@mui/material';

export const stylesOverride: ThemeOptions = {
  palette: {
    primary: {
      main: '#12233A'
    },
    secondary: {
      main: '#E04403'
    },
    success: {
      main: '#92C044'
    },
    background: {
      default: '#F5F5F5'
    }
  },
  typography: {
    fontFamily: 'Futura Std Medium'
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'secondary'
      },
      styleOverrides: {
        root: {
          letterSpacing: 2
        }
      }
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: '1px solid',
          borderRadius: 4,
          borderColor: '#e0e0e0',
          borderCollapse: 'separate'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 0,
          borderTop: '1px solid',
          borderColor: '#e0e0e0'
        },
        head: {
          border: 0
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: 'filled'
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        variant: 'filled'
      }
    }
  }
};

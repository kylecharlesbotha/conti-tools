import './fonts/FuturaStdMedium.ttf';
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar as NavigationOffset
} from '@mui/material';
import React from 'react';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';
import {
  ErrorBoundary,
  NavigationContainer,
  PageTitleContextProvider,
  RoutesContainer
} from './common';
import { stylesOverride } from './styles-override';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { ConfirmProvider } from 'material-ui-confirm';
import { ServiceProvider } from './common/service-context-provider/ServiceContextProvider';

function App() {
  const drawerWidth = 240;
  const styles = {
    content: {
      flexGrow: 1,
      padding: 3
    }
  } as const;

  return (
    <ErrorBoundary>
      <ThemeProvider theme={createTheme(stylesOverride)}>
        <ServiceProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            autoHideDuration={3000}
          >
            <ConfirmProvider>
              <PageTitleContextProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Router>
                    <Box sx={{ display: 'flex' }}>
                      <CssBaseline />
                      <NavigationContainer drawerWidth={drawerWidth} />
                      <Box component="main" sx={styles.content}>
                        <NavigationOffset />
                        <RoutesContainer />
                        <Outlet />
                      </Box>
                    </Box>
                  </Router>
                </LocalizationProvider>
              </PageTitleContextProvider>
            </ConfirmProvider>
          </SnackbarProvider>
        </ServiceProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

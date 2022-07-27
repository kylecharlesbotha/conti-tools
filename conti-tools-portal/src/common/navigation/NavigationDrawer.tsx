import {
  Box,
  createTheme,
  CSSObject,
  Drawer,
  List,
  Theme,
  ThemeProvider,
  Toolbar as NavigationOffset,
  useTheme
} from '@mui/material';
import { NavigationLink } from './NavigationLink';
import HomeIcon from '@mui/icons-material/Home';

import { stylesOverride } from 'src/styles-override';
import SummarizeIcon from '@mui/icons-material/Summarize';
import TocIcon from '@mui/icons-material/Toc';
interface NavigationDrawerProps {
  drawerWidth: number;
  isOpen: boolean;
}

export const NavigationDrawer = ({
  drawerWidth,
  isOpen
}: NavigationDrawerProps) => {
  const theme = useTheme();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    backgroundColor: 'primary.main',
    color: 'white'
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    backgroundColor: 'primary.main',
    color: 'white',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`
    }
  });

  const openedStyles = {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  };

  const closedStyles = {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  };

  const styles = {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(isOpen ? openedStyles : closedStyles)
    }
  } as const;

  const navigationItems = [
    {
      to: '/',
      primary: 'Home',
      icon: <HomeIcon sx={{ color: 'white' }} />
    },
    {
      to: '/file-uploads',
      primary: 'Reports',
      icon: <SummarizeIcon sx={{ color: 'white' }} />
    },
    {
      to: '/data',
      primary: 'Data',
      icon: <TocIcon sx={{ color: 'white' }} />
    }
  ];

  return (
    <Drawer variant="permanent" sx={styles.drawer}>
      <NavigationOffset />
      <ThemeProvider theme={createTheme(stylesOverride)}>
        <Box
          sx={{
            overflow: 'auto',
            width: drawerWidth,
            boxSizing: 'border-box'
          }}
        >
          {/* <Box
            sx={{
              overflow: 'auto',
              boxSizing: 'border-box',
              width: drawerWidth,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 6
            }}
          >
            <Box
              component="img"
              sx={{
                height: 80,
                width: 200,
                maxHeight: { xs: 80, md: 80 },
                maxWidth: { xs: 200, md: 200 }
              }}
              alt="The house from the offer."
              src={require('../../assets/CC-Logo-retina-light.png')}
            />
          </Box> */}
          <List>
            {navigationItems.map((item, index) => (
              <NavigationLink
                key={index}
                to={item.to}
                primary={item.primary}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      </ThemeProvider>
    </Drawer>
  );
};

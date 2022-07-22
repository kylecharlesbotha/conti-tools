import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Theme, Toolbar, Typography } from '@mui/material';
interface NavigationBarProps {
  toggleIsOpen: () => void;
  pageTitle: string;
  isOpen: boolean;
  drawerWidth: number;
}

export const NavigationBar = ({
  toggleIsOpen,
  pageTitle,
  isOpen,
  drawerWidth
}: NavigationBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme: Theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
          }),
        ...(isOpen && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: (theme: Theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen
            })
        })
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggleIsOpen()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useHeaderStyles } from './Header.styles';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface HeaderProps {
  toggleDrawer: (open: boolean) => void;
  openDrawer: boolean;
  darkTheme: boolean;
}

const Header: React.FC<HeaderProps> = ({
  toggleDrawer,
  openDrawer,
  darkTheme,
}) => {
  const { classes, cx } = useHeaderStyles();
  const [auth, setAuth] = React.useState(true);

  const handleClickAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAuth(!auth);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={cx(classes.appbar, darkTheme ? 'dark' : null)}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(!openDrawer)}
          >
            <MenuIcon
              className={cx(classes.menuToggler, darkTheme ? 'dark' : null)}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/my-test-with-mui/"
            className={cx(classes.logo, darkTheme ? 'dark' : null)}
          >
            LOGO
          </Typography>
          {auth ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <Button
                variant="outlined"
                className={cx(classes.cashButton, darkTheme ? 'dark' : null)}
              >
                Очистити кеш
              </Button>
              <IconButton
                aria-label="show new notifications"
                color="inherit"
                className={cx(
                  classes.headerNotificationsButton,
                  darkTheme ? 'dark' : null
                )}
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                className={cx(
                  classes.headerAccountIconButton,
                  darkTheme ? 'dark' : null
                )}
              >
                <AccountCircle style={{ width: '40px', height: '40px' }} />
              </IconButton>

              <Box className={classes.credentials}>
                <Typography
                  component="p"
                  className={cx(classes.userName, darkTheme ? 'dark' : null)}
                >
                  Austin Robertson
                </Typography>
                <Typography
                  component="p"
                  className={cx(classes.userEmail, darkTheme ? 'dark' : null)}
                >
                  user@mail.com
                </Typography>
              </Box>
              <IconButton
                aria-label="logout"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClickAuth}
                color="inherit"
                className={cx(
                  classes.headerLoginButton,
                  darkTheme ? 'dark' : null
                )}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton
              aria-label="logout"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickAuth}
              color="inherit"
              className={cx(
                classes.headerLogoutButton,
                darkTheme ? 'dark' : null
              )}
            >
              <LoginIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

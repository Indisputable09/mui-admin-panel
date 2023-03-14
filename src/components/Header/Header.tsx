import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useHeaderStyles } from './Header.styles';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { fetchUserData, token } from '../../services/authAPI';
import Modal from '../Modal';
import LogoIcon from '../LogoIcon';

interface HeaderProps {
  toggleDrawer: (open: boolean) => void;
  openDrawer: boolean;
  darkTheme: boolean;
  setLoggedIn: (user: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleDrawer,
  openDrawer,
  darkTheme,
  setLoggedIn,
}) => {
  const { classes, cx } = useHeaderStyles();
  const [userData, setUserData] = React.useState<{
    email: string;
    name: string;
  }>({ email: '', name: '' });
  const [openLogOutModal, setOpenLogOutModal] = React.useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenLogOutModal(true);
  };

  const handleCloseModal = () => {
    setOpenLogOutModal(false);
  };

  const handleClickAuth = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleClickOpenModal();
  };

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      const userToken = localStorage.getItem('token');
      token.set(userToken);
    } else if (sessionStorage.getItem('token')) {
      const userToken = sessionStorage.getItem('token');
      token.set(userToken);
    }
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      const userCredentials = await fetchUserData();
      setUserData(userCredentials);
    };
    fetchData();
  }, []);

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
          <Link
            to="/dashboard"
            className={cx(classes.logo, darkTheme ? 'dark' : null)}
          >
            <LogoIcon />
          </Link>
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
                {userData.name}
              </Typography>
              <Typography
                component="p"
                className={cx(classes.userEmail, darkTheme ? 'dark' : null)}
              >
                {userData.email}
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
        </Toolbar>
      </AppBar>
      {openLogOutModal && (
        <Modal
          shouldOpenModal={openLogOutModal}
          handleCloseModal={handleCloseModal}
          setLoggedIn={setLoggedIn}
          type={'logout'}
        />
      )}
    </Box>
  );
};

export default Header;

import { makeStyles } from 'tss-react/mui';

export const useHeaderStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    appbar: {
      background: '#ffffff',
      color: '#232D42',
      // boxShadow: '0px 7px 11px -1px rgba(0,0,0,0.47)',
      boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.25)',
      position: 'relative',
      transition: 'all 250ms ease-out',
      '&.dark': {
        backgroundColor: '#1F2A38',
        boxShadow: 'none',
      },
    },
    menuToggler: {
      color: '#000000',
      transition: 'color 250ms ease-out',
      '&.dark': {
        color: '#ffffff',
      },
    },
    logo: {
      display: 'flex',
      fontFamily: 'monospace',
      fontWeight: 700,
      letterSpacing: '.3rem',
      color: 'inherit',
      textDecoration: 'none',
      transition: 'all linear 250ms',
      '&.dark': {
        color: '#ffffff',
      },
      '&:hover': {
        textDecoration: 'none',
        transform: 'scale(1.1)',
        color: 'inherit',
        '&.dark': {
          color: '#ffffff',
        },
      },
    },
    cashButton: {
      padding: '6px 16px 6px 16px',
      marginRight: '16px',
      fontSize: '11px',
      backgroundColor: 'transparent',
      transition: 'all linear 250ms',
      color: '#1976D2',
      '&:hover, &:focus': { backgroundColor: '#90CAF914 !important' },
      '&.dark': {
        color: '#90CAF9',
        backgroundColor: 'inherit',
        border: '1px solid #90CAF9',
      },
    },
    credentials: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    userName: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '1.75',
      color: '#000000DE',
      transition: 'all linear 250ms',
      '&.dark': {
        color: '#ffffff',
      },
    },
    userEmail: {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.3',
      color: '#00000099',
      transition: 'all linear 250ms',
      '&.dark': {
        color: '#FFFFFFB2',
      },
    },
    headerAccountIconButton: {
      marginLeft: '24px',
      transition: 'all linear 250ms',
      color: '#0000008A',
      '&.dark': {
        color: 'rgba(250, 250, 250, 0.3)',
      },
    },
    headerNotificationsButton: {
      width: '16px',
      height: '20px',
      transition: 'all linear 250ms',
      color: '#000000DE',
      '&.dark': {
        color: '#FFFFFF8F',
      },
    },
    headerLogoutButton: {
      marginLeft: 'auto',
      width: '16px',
      height: '20px',
      transition: 'all linear 250ms',
      color: '#0000008A',
      '&.dark': {
        color: '#FFFFFF8F',
      },
    },
    headerLoginButton: {
      marginLeft: '36px',
      width: '16px',
      height: '20px',
      transition: 'all linear 250ms',
      color: '#0000008A',
      '&.dark': {
        color: '#FFFFFF8F',
      },
    },
  })
);

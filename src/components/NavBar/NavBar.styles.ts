import { createTheme } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

export const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1224,
      lg: 1260,
      xl: 1450,
    },
  },
});

export const drawerWidth = 260;
export const miniDrawerWidth = 60;

export const useNavBarStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    root: {
      display: 'flex',
    },
    drawerPaper: {
      position: 'absolute',
      zIndex: '1102',
      height: 'calc(100vh - 64px)',
      top: '64px',
      [customTheme.breakpoints.down('sm')]: {
        top: '51px',
        height: 'calc(100vh - 51px)',
      },
      left: 0,
      overflowX: 'hidden',
      transition: 'background-color 250ms linear, width 400ms linear',
      whiteSpace: 'nowrap',
      width: miniDrawerWidth,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      boxShadow: '4px 5px 5px rgb(0 0 0 / 25%)',
      '&.dark': {
        backgroundColor: '#1F2A38',
        boxShadow: 'none',
      },
      '&.active': {
        transition: 'all 400ms linear',
        width: drawerWidth,
      },
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'lightGrey',
        '&:hover': { background: 'grey' },
        borderRadius: '100vw',
      },
    },
    content: {
      flexGrow: 1,
      height: 'calc(100vh - 64px)',
      [customTheme.breakpoints.down('sm')]: {
        height: 'calc(100vh - 56px)',
      },
      overflowX: 'hidden',
      backgroundColor: '#fff',
      transition: 'all 250ms ease-out',
      '&.dark': {
        backgroundColor: '#24303F',
        color: '#fff',
      },
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'lightGrey',
        '&:hover': { background: 'grey' },
        borderRadius: '100vw',
      },
    },
    title: {
      fontWeight: 400,
      fontSize: '34px',
      lineHeight: '123.5%',
      marginBottom: '32px',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#ffffff',
      },
    },
    overlay: {},
    container: {
      padding: 0,
      maxWidth: `calc(100%) !important`,
      marginRight: '0',
      marginLeft: '0',
      position: 'relative',
      top: 0,
      left: 0,
      paddingLeft: `84px !important`,
      transition: 'all 250ms linear',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(8),
      '&.active': {
        // [customTheme.breakpoints.up('xl')]: {
        width: `calc(100% - ${drawerWidth}px) !important`,
        transform: `TranslateX(${drawerWidth - 24}px)`,
        // },
      },
    },
  })
);

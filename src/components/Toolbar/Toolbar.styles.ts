import { makeStyles } from 'tss-react/mui';
import { customTheme } from '../NavBar/NavBar.styles';

export const useToolbarStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    toolbarContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
      width: '100%',
      backgroundColor: '#fff',
      padding: '0 16px 0 16px',
      borderRadius: '4px 4px 0 0',
      transition: 'all 250ms ease-out',
      borderBottom: 'none',
      '&.dark': { backgroundColor: 'transparent' },
    },
    searchField: {
      width: '720px',
      [customTheme.breakpoints.down('md')]: {
        width: '400px',
      },
      [customTheme.breakpoints.down(800)]: {
        width: '100%',
      },
    },
    searchIconButton: {
      transition: 'all 250ms ease-out',
      '&:hover': {
        backgroundColor: 'transparent',
        transition: 'all 250ms ease-out',
        '& svg': {
          transition: 'all 250ms ease-out',
          transform: 'scale(1.3)',
        },
      },
      '&.dark svg': {
        transition: 'all 250ms ease-out',
        color: '#ffffff',
      },
      '&.dark:hover svg': {
        transition: 'all 250ms ease-out',
        transform: 'scale(1.3)',
      },
    },
    addButton: {
      marginLeft: 'auto',
      backgroundColor: '#1F2A38',
      color: '#ffffff',
      minWidth: '48px',
      height: '48px',
      borderRadius: '50%',
      padding: 0,
      boxShadow:
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',

      transition: 'all 250ms ease-out',
      '&:hover, &:focus': { backgroundColor: '#1565C0' },
      '&.dark': {
        boxShadow:
          ' 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)',
        backgroundColor: '#f2f2f2',
        '&:hover, &:focus': { backgroundColor: '#1565C0', color: '#ffffff' },
        '&:hover svg, &:focus svg': { color: '#ffffff' },
        '& svg': {
          color: '#000000',
          opacity: '0.87',
        },
      },
    },
  })
);

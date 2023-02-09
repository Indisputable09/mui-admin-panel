import { makeStyles } from 'tss-react/mui';

export const useNavBarMenuItemStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    menuPrimaryItem: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '1.75',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#ffffff',
      },
      '& > a': {
        display: 'block',
        fontSize: '16px',
        width: '100%',
        color: '#1b0b08',
      },
      '& > a.active': {
        color: '#1b0b08',
        '& span': {
          fontSize: '19px',
        },
      },
      '&.dark > a': {
        color: '#c8cdd9',
      },
      '&.dark > a.active': {
        color: '#fef3f2',
        '& span': {
          fontSize: '19px',
        },
      },
    },
    menuSecondaryItemList: {},
    menuSecondaryItem: {
      padding: 0,
      position: 'relative',
      color: '#8A92A6',
      transition: 'all 250ms ease-out',
      '& > a': {
        display: 'block',
        fontSize: '16px',
        paddingLeft: '20px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '100%',
        color: '#1b0b08',
      },
      '& > a.active': {
        backgroundColor: '#f8f1f1',
        width: '100%',
        color: '#1b0b08',
        '& span': {
          fontWeight: 500,
          fontSize: '17px',
        },
      },
      '&.dark > a': {
        color: '#c8cdd9',
      },
      '&.dark > a.active': {
        backgroundColor: '#f8f1f124',
        color: '#fef3f2',
        '& span': {
          fontWeight: 500,
          fontSize: '17px',
        },
      },
    },
    menuSubList: {
      color: '#1b0b08',
      transition: 'all 250ms ease-out',
      width: '100%',
      '& > div:first-of-type': {
        paddingLeft: '20px',
      },
      '&.dark': { color: '#c8cdd9' },
      '&.active': {
        color: '#1b0b08',
        '& > div > div > span': {
          fontSize: '17px',
        },
      },
      '&.dark.active': {
        color: '#fef3f2',
        '& > div > div > span': {
          fontSize: '17px',
        },
      },
    },
    menuSubItem: {
      color: '#8A92A6',
      transition: 'all 250ms ease-out',
      '& > a': {
        display: 'block',
        fontSize: '16px',
        paddingLeft: '24px',
        width: '100%',
        color: '#1b0b08',
      },
      '& > a.active': {
        color: '#1b0b08',
        '& span': {
          fontSize: '17px',
        },
      },
      '&.dark > a': {
        color: '#c8cdd9',
      },
      '&.dark > a.active': {
        color: '#fef3f2',
        '& span': {
          fontSize: '17px',
        },
      },
    },
    menuItemIcon: {
      color: '#111111',
      transition: 'all 250ms ease-out',
      '&.active': { color: '#1976D2' },
      '&.dark': {
        color: '#ffffff',
      },
      '&.dark.active': {
        color: '#90CAF9',
      },
    },
  })
);

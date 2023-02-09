import { makeStyles } from 'tss-react/mui';

export const useMoreActionsStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    editIcon: {
      transition: 'all 250ms ease-out',
      color: '#000000DE',
      '&.dark': {
        color: '#FFFFFF',
      },
      'button:hover > &': {
        color: '#219653',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      'button:hover > &.dark, button:focus > &.dark': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
    moreIconButton: {
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 250ms ease-out',
      borderRadius: '4px',
      '&:hover, &:focus': {
        backgroundColor: '#0000000A',
      },
      '&.dark:hover, &.dark:focus': {
        backgroundColor: '#90CAF914',
      },
    },
    moreActionsMenu: {
      display: 'flex',
      justifyContent: 'center',
      transition: 'all 250ms ease-out',
      '&.dark ul': {
        backgroundColor: '#1F2A38',
        color: '#fff',
      },
    },
  })
);

import { makeStyles } from 'tss-react/mui';

export const useSelectActionsStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    selectLabel: {
      '&.dark': {
        color: '#ffffff',
      },
    },
    selectInput: {
      '&.dark': {
        color: '#fff',
      },
      transition: 'all 250ms ease-out',
      '&.dark > svg': {
        color: '#fff',
        transition: 'all 250ms ease-out',
      },
      '& > svg': {
        color: 'inherit',
        transition: 'all 250ms ease-out',
      },
      '& > fieldset': {
        borderColor: 'grey',
        transition: 'all 250ms ease-out',
      },
      '&.dark:hover > fieldset': {
        borderColor: 'white',
        transition: 'all 250ms ease-out',
      },
      '&.dark.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },
    selectMenu: {
      '&.dark ul': {
        backgroundColor: '#1F2A38',
        color: '#ffffff',
      },
      '&.dark li': {
        fontSize: 12,
      },
    },
    menuItem: {
      '& svg': {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      '&.dark svg': {
        color: '#ffffff',
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1,
    },
  })
);

import { makeStyles } from 'tss-react/mui';

export const useCrumbsStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    mainLink: {
      color: 'rgba(0, 0, 0, 0.6)',
      transition: 'all 250ms ease-out',
      '&.dark': { color: '#ffffff' },
    },
    separator: {
      transition: 'all 250ms ease-out',
      color: 'inherit',
      '&.dark': {
        color: '#ffffff',
      },
    },
    currentLink: {
      color: 'rgba(0, 0, 0, 0.87)',
      transition: 'all 250ms ease-out',
      '&.dark': { color: '#ffffff' },
    },
  })
);

import { makeStyles } from 'tss-react/mui';

export const useBasicActionsStyles = makeStyles<void>()(
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
    deleteIcon: {
      transition: 'color 250ms ease-out',
      'button:hover > &, button:focus > &': {
        color: '#EB5757',
        filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      },
      'button:hover > &.dark, button:focus > &.dark': {
        filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      },
    },
  })
);

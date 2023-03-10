import { makeStyles } from 'tss-react/mui';

export const useVisibilityActionStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    visibilityIcon: {
      transition: 'all 250ms ease-out',
      color: '#000000DE',
      '&.dark': {
        color: '#FFFFFF',
      },
      //   'button:hover > &': {
      //     color: '#219653',
      //     filter: 'drop-shadow(2px 2px 0px rgba(0, 0, 0, 0.25))',
      //   },
      //   'button:hover > &.dark, button:focus > &.dark': {
      //     filter: 'drop-shadow(2px 2px 0px rgba(255, 255, 255, 0.25))',
      //   },
    },
  })
);

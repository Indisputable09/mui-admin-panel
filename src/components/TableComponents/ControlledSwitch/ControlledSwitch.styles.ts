import { makeStyles } from 'tss-react/mui';

export const useControlledSwitchStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    switch: {
      '& .Mui-checked > .MuiSwitch-thumb': {
        color: '#1976D2 !important',
      },
      '& .MuiSwitch-track': {
        backgroundColor: '#000000 !important',
      },
      '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#1976D2 !important',
      },
      '&.dark .Mui-checked > .MuiSwitch-thumb': {
        color: '#90CAF9 !important',
      },
      '&.dark .MuiSwitch-track': {
        backgroundColor: '#E0E0E0 !important',
      },
      '&.dark .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#90CAF9 !important',
      },
    },
  })
);

import { makeStyles } from 'tss-react/mui';

export const useMultipleSelectStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
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
    cancelAllChipsButton: {
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translateY(-50%)',
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#fff',
      },
    },
    chip: {
      transition: 'all 250ms ease-out',
      '&.dark': {
        backgroundColor: 'grey',
        color: '#ffffff',
      },
    },
    cancelChipIcon: {
      transition: 'all 250ms ease-out',
      '&.dark': {
        color: '#ffffff',
      },
    },
    selectMenu: {
      '&.dark ul': {
        backgroundColor: '#1F2A38',
        color: '#fff',
      },
      '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#24303F',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'grey',
        '&:hover': { background: 'grey' },
        borderRadius: '100vw',
      },
    },
  })
);

import { makeStyles } from 'tss-react/mui';
import { styled } from '@mui/material/styles';
import { CustomPaper } from './SubLinks/Prices';

export const useBasicPageStyles = makeStyles<void>()(
  (theme, _params, classes) => ({
    basicDescriptionField: {
      [`& fieldset`]: {
        borderRadius: '0 0 4px 4px',
      },
    },
  })
);

interface ICustomPaperProps {
  darkTheme: boolean;
}

export const StyledCustomPaper = styled(CustomPaper, {
  shouldForwardProp: prop =>
    prop !== 'color' &&
    prop !== 'variant' &&
    prop !== 'sx' &&
    prop !== 'darkTheme',
  name: 'SearchField',
  slot: 'Root',
})<ICustomPaperProps>(({ darkTheme }) => {
  return {
    '&': {
      backgroundColor: darkTheme ? '#1F2A38' : '#ffffff',
      color: darkTheme ? '#fff' : '#111111',
    },
    '& p': {
      color: darkTheme ? '#ffffff' : 'inherit',
      margin: 0,
    },
    '& svg': {
      color: darkTheme ? '#ffffff' : 'inherit',
    },
    '& ul::-webkit-scrollbar': {
      width: '5px',
      height: '5px',
    },
    '& ul::-webkit-scrollbar-track': {
      background: darkTheme ? '#24303F' : 'transparent',
    },
    '& ul::-webkit-scrollbar-thumb': {
      background: 'grey',
      '&:hover': { background: 'grey' },
      borderRadius: '100vw',
    },
  };
});

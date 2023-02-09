import { styled } from '@mui/system';
import { TextField } from '@mui/material';
// import { text } from 'node:stream/consumers';
// import { useGlobalContext } from '../../../hooks/GlobalContext';
// import { TextFieldProps } from '@mui/material';
// import React from 'react';

// interface IStyledFieldProps {
//   darkTheme: boolean;
// }

interface IStyledFieldProps {
  darkTheme: boolean;
}

const StyledField = styled(TextField, {
  shouldForwardProp: prop =>
    prop !== 'color' &&
    prop !== 'variant' &&
    prop !== 'sx' &&
    prop !== 'darkTheme',
  name: 'SearchField',
  slot: 'Root',
})<IStyledFieldProps>(props => {
  return {
    input: {
      color: props.darkTheme ? '#ffffff' : '#000000',
      fontSize: '14px',
      padding: '12px 14px',
    },
    textarea: {
      color: props.darkTheme ? '#ffffff' : '#000000',
    },
    '&.dark label.Mui-focused': {
      color: '#ffffff',
    },
    '&.dark label': {
      color: '#ffffff',
    },
    '&.dark .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'grey',
      },
      '&:hover fieldset': {
        borderColor: props.darkTheme ? '#fff' : '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: props.darkTheme ? '#fff' : '#1976d2',
      },
    },
  };
});

// interface IStyledFieldProps {
//   darkTheme: boolean;
// }

// const StyledField: React.FC<TextFieldProps & IStyledFieldProps> = props => {

//   const type = () => {
//     if (props.type === 'number') {
//       return 'text';
//     } else return props.type;
//   };

//   const onChange = () => {
//     if (props.type === 'number') {
//       if (isNaN(props.value as any)) {
//         return;
//       }
//     } else {
//       if (props.onChange) {
//         console.log('props.onChange', props.onChange);
//         return props.onChange;
//       }
//     }
//   };

//   const newProps = { ...props, type: type(), onChange: onChange() };

//   return <StyledTextField {...newProps} />;
// };

export default StyledField;

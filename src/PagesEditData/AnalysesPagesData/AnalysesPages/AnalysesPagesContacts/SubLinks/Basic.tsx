import React from 'react';
import { InputLabel } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    telegram: string;
    viber: string;
    facebook: string;
    instagram: string;
  };
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();

  const handleFieldsChange = (e: any) => {
    setFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
      };
    });
  };

  return (
    <>
      <InputLabel
        htmlFor="telegram"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Telegram
        <StyledField
          id="telegram"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={fieldsValues.telegram}
          onChange={handleFieldsChange}
        />
      </InputLabel>
      <InputLabel
        htmlFor="viber"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Viber
        <StyledField
          id="viber"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={fieldsValues.viber}
          onChange={handleFieldsChange}
        />
      </InputLabel>
      <InputLabel
        htmlFor="facebook"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Facebook
        <StyledField
          id="facebook"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={fieldsValues.facebook}
          onChange={handleFieldsChange}
        />
      </InputLabel>
      <InputLabel
        htmlFor="instagram"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Instagram
        <StyledField
          id="instagram"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={fieldsValues.instagram}
          onChange={handleFieldsChange}
        />
      </InputLabel>
    </>
  );
};

import React from 'react';
import { InputLabel } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../components/Inputs/StyledField';
import { LanguagesTabsList } from '../../../PagesDataCommon/LanguagesTabsList';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    text1: { code: string; value: string }[];
    text2: { code: string; value: string }[];
  };
  languages: { value: string; code: string }[];
}

export const Data: React.FC<IDataProps> = ({
  fieldsValues,
  setFieldsValues,
  darkTheme,
  languages,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const [languageCode, setLanguageCode] = React.useState<string>(
    languages[0].code
  );

  const handleLanguageClick = (code: string) => {
    setLanguageCode(code as string);
  };

  const handleFieldsChange =
    (key: string, index?: number) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        const newArray = fieldsValues[key].map((item: any, i: any) => {
          if (index === i) {
            return { ...item, value: (e.target as HTMLInputElement).value };
          } else return item;
        });
        return {
          ...prevState,
          [key]: [...newArray],
        };
      });
    };

  return (
    <>
      <LanguagesTabsList
        handleLanguageClick={handleLanguageClick}
        languageCode={languageCode}
        languages={languages}
      />
      {fieldsValues.text1.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Текст 1
                <StyledField
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value ? item.value : ''}
                  onChange={handleFieldsChange('text1', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.text2.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Текст 2
                <StyledField
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value ? item.value : ''}
                  onChange={handleFieldsChange('text2', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

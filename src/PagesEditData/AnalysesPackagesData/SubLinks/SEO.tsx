import React from 'react';
import { InputLabel } from '@mui/material';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../components/Inputs/StyledField';
import { LanguagesTabsList } from '../../PagesDataCommon/LanguagesTabsList';

interface ISEOProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    metaTitle: {
      code: string;
      value: string;
    }[];
    metaDescription: {
      code: string;
      value: string;
    }[];
  };
  languages: { value: string; code: string }[];
}

export const SEO: React.FC<ISEOProps> = ({
  darkTheme,
  fieldsValues,
  setFieldsValues,
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
    (key?: string, index?: number) => (e: React.ChangeEvent) => {
      setFieldsValues((prevState: any) => {
        if (key) {
          const newArray = fieldsValues[key].map((item: any, i: any) => {
            if (index === i) {
              return { ...item, value: (e.target as HTMLInputElement).value };
            } else return item;
          });
          return {
            ...prevState,
            [key]: [...newArray],
          };
        } else {
          return {
            ...prevState,
            [e.target.id]: (e.target as HTMLInputElement).value,
          };
        }
      });
    };

  return (
    <>
      <LanguagesTabsList
        handleLanguageClick={handleLanguageClick}
        languageCode={languageCode}
        languages={languages}
      />
      {fieldsValues.metaTitle.map((title, index) => {
        return (
          <React.Fragment key={index}>
            {title.code === languageCode && (
              <InputLabel
                htmlFor="metaTitle"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                ???????? ??????????
                <StyledField
                  id="metaTitle"
                  multiline
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={title.value ? title.value : ''}
                  onChange={handleFieldsChange('metaTitle', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.metaDescription.map((description, index) => {
        return (
          <React.Fragment key={index}>
            {description.code === languageCode && (
              <InputLabel
                htmlFor="metaDescription"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                ???????? ????????
                <StyledField
                  id="metaDescription"
                  multiline
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={description.value ? description.value : ''}
                  onChange={handleFieldsChange('metaDescription', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

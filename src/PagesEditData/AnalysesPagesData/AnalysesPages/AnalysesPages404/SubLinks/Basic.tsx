import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../../components/Inputs/StyledField';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    buttonText: { code: string; value: string }[];
    url: string;
  };
  languages: { name: string; id: number; code: string }[];
}

export const Basic: React.FC<IBasicProps> = ({
  darkTheme,
  setFieldsValues,
  fieldsValues,
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
      <List className={classes.languagesList}>
        {languages.map(language => {
          return (
            <ListItem
              key={language.id}
              className={classes.languagesListItem}
              onClick={() => handleLanguageClick(language.code)}
            >
              <Typography
                className={cx(
                  classes.languagesListText,
                  languageCode === language.code ? 'active' : null,
                  darkTheme ? 'dark' : null
                )}
                component="p"
              >
                {language.name.toLocaleUpperCase()}
              </Typography>
            </ListItem>
          );
        })}
      </List>
      {fieldsValues.buttonText.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                htmlFor="buttonText"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Текст на кнопці
                <StyledField
                  id="buttonText"
                  multiline
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value}
                  onChange={handleFieldsChange('buttonText', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      <InputLabel
        htmlFor="url"
        className={cx(
          classes.label,
          darkTheme ? 'dark' : null,
          'noBottomMargin'
        )}
      >
        Url
        <StyledField
          id="url"
          variant="outlined"
          sx={{ width: '100%', mt: '16px' }}
          required
          darkTheme={darkTheme}
          value={fieldsValues.url}
          onChange={handleFieldsChange()}
        />
      </InputLabel>
    </>
  );
};

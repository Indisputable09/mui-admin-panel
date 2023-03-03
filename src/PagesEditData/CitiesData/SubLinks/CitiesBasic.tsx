import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface ICitiesBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    name: {
      code: string;
      value: string;
    }[];
    address: {
      code: string;
      value: string;
    }[];
    workingHours: { code: string; value: string }[];
  };
  languages: { name: string; id: number; code: string }[];
}

export const CitiesBasic: React.FC<ICitiesBasicProps> = ({
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
      {fieldsValues.name.map((name, index) => {
        return (
          <React.Fragment key={index}>
            {name.code === languageCode && (
              <InputLabel
                htmlFor="name"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                <div>
                  Назва міста
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </div>
                <StyledField
                  id="name"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={name.value}
                  onChange={handleFieldsChange('name', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.address.map((address, index) => {
        return (
          <React.Fragment key={index}>
            {address.code === languageCode && (
              <InputLabel
                htmlFor="address"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Адреса
                <StyledField
                  id="address"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={address.value}
                  onChange={handleFieldsChange('address', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.workingHours.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <>
                <InputLabel
                  htmlFor="workingHours"
                  className={cx(
                    classes.label,
                    darkTheme ? 'dark' : null,
                    'noBottomMargin'
                  )}
                >
                  Часи праці
                  <StyledField
                    variant="outlined"
                    id="workingHours"
                    sx={{ width: '40%', mt: '16px' }}
                    darkTheme={darkTheme}
                    value={item.value}
                    onChange={handleFieldsChange('workingHours', index)}
                  />
                </InputLabel>
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

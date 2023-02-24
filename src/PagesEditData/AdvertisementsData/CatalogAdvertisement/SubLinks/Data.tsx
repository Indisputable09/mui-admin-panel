import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import { usePagesDataCommonStyles } from '../../../PagesDataCommon/PagesDataCommon.styles';
import StyledField from '../../../../components/Inputs/StyledField';

interface IDataProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    texts: {
      id: string;
      text: {
        code: string;
        value: string;
      }[];
      label: string;
    }[];
  };
  languages: { name: string; id: number; code: string }[];
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
    (index: number, valuesIndex: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFieldsValues((prevState: any) => {
        const newArray = prevState.texts.map((item: any, i: number) => {
          if (index === i) {
            const newValues = item.text.map(
              (subItem: any, subIndex: number) => {
                if (subIndex === valuesIndex) {
                  return {
                    ...subItem,
                    value: (e.target as HTMLInputElement).value,
                  };
                } else {
                  return subItem;
                }
              }
            );
            return {
              ...item,
              text: [...newValues],
            };
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          texts: newArray,
        };
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
      {fieldsValues.texts.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <InputLabel
              className={cx(classes.label, darkTheme ? 'dark' : null)}
            >
              {item.label}
              {item.text.map((text, textIndex) => {
                return (
                  <React.Fragment key={textIndex}>
                    {text.code === languageCode && (
                      <StyledField
                        variant="outlined"
                        sx={{ width: '100%', mt: '16px' }}
                        darkTheme={darkTheme}
                        value={text.value}
                        onChange={handleFieldsChange(index, textIndex)}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </InputLabel>
          </React.Fragment>
        );
      })}
    </>
  );
};

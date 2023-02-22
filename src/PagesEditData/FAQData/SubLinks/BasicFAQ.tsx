import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import StyledField from '../../../components/Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface IBasicFAQProps {
  darkTheme: boolean;
  fieldsValues: {
    question: { code: string; value: string }[];
    answer: { code: string; value: string }[];
  };
  setFieldsValues: (obj: any) => void;
  languages: { name: string; id: number; code: string }[];
}

export const BasicFAQ: React.FC<IBasicFAQProps> = ({
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
      {fieldsValues.question.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Питання
                <StyledField
                  id="question"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value}
                  onChange={handleFieldsChange('question', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      {fieldsValues.answer.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <InputLabel
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                Відповідь
                <StyledField
                  multiline
                  rows={10}
                  id="answer"
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={item.value}
                  onChange={handleFieldsChange('answer', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

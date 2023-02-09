import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface IBasicFAQProps {
  darkTheme: boolean;
  FAQFieldsValues: {
    question: string;
    questionEng: string;
    answer: string;
    answerEng: string;
  };
  setFAQFieldsValues: (obj: any) => void;
  languages: { name: string; id: number }[];
}

export const BasicFAQ: React.FC<IBasicFAQProps> = ({
  darkTheme,
  setFAQFieldsValues,
  FAQFieldsValues,
  languages,
}) => {
  const { classes, cx } = usePagesDataCommonStyles();
  const [languageId, setLanguageId] = React.useState<number>(1);

  const handleLanguageClick = (id: number) => {
    setLanguageId(id as number);
  };

  const handleFAQFieldsChange = (e: React.ChangeEvent) => {
    setFAQFieldsValues((prevState: any) => {
      return {
        ...prevState,
        [e.target.id]: (e.target as HTMLInputElement).value,
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
              onClick={() => handleLanguageClick(language.id)}
            >
              <Typography
                className={cx(
                  classes.languagesListText,
                  languageId === language.id ? 'active' : null,
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
      <InputLabel
        htmlFor="question"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Питання
        {languageId === 1 ? (
          <StyledField
            id="question"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={FAQFieldsValues.question}
            onChange={handleFAQFieldsChange}
          />
        ) : (
          <StyledField
            id="questionEng"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            required
            darkTheme={darkTheme}
            value={FAQFieldsValues.questionEng}
            onChange={handleFAQFieldsChange}
          />
        )}
      </InputLabel>
      <InputLabel
        htmlFor="answer"
        className={cx(classes.label, darkTheme ? 'dark' : null)}
      >
        Відповідь
        {languageId === 1 ? (
          <StyledField
            id="answer"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            darkTheme={darkTheme}
            multiline
            rows={10}
            value={FAQFieldsValues.answer}
            onChange={handleFAQFieldsChange}
          />
        ) : (
          <StyledField
            id="answerEng"
            variant="outlined"
            sx={{ width: '100%', mt: '16px' }}
            darkTheme={darkTheme}
            multiline
            rows={10}
            value={FAQFieldsValues.answerEng}
            onChange={handleFAQFieldsChange}
          />
        )}
      </InputLabel>
    </>
  );
};

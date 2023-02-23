import React from 'react';
import {
  InputLabel,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import StyledField from '../../../../../components/Inputs/StyledField';
import { usePagesDataCommonStyles } from '../../../../PagesDataCommon/PagesDataCommon.styles';
import Editor from '../../../../../components/Inputs/Editor';

interface IDescriptionProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    title: { code: string; value: string }[];
    description: { code: string; value: string }[];
  };
  languages: { id: number; code: string; name: string }[];
}

export const Basic: React.FC<IDescriptionProps> = ({
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

  const handleFieldsChange = (key?: string, index?: number) => (e: any) => {
    setFieldsValues((prevState: any) => {
      if (key) {
        const newArray = fieldsValues[key].map((item: any, i: any) => {
          if (index === i) {
            if (e.hasOwnProperty('editor')) {
              return {
                ...item,
                value: e.editor.getData(),
              };
            } else {
              return { ...item, value: (e.target as HTMLInputElement).value };
            }
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
      {fieldsValues.title.map((title, index) => {
        return (
          <React.Fragment key={index}>
            {title.code === languageCode && (
              <InputLabel
                htmlFor="title"
                className={cx(
                  classes.label,
                  darkTheme ? 'dark' : null,
                  'topMargin'
                )}
              >
                Заголовок
                <StyledField
                  id="title"
                  multiline
                  variant="outlined"
                  sx={{ width: '100%', mt: '16px' }}
                  required
                  darkTheme={darkTheme}
                  value={title.value}
                  onChange={handleFieldsChange('title', index)}
                />
              </InputLabel>
            )}
          </React.Fragment>
        );
      })}
      <Typography component="h2" className={classes.descriptionText}>
        Опис
      </Typography>
      {fieldsValues.description.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.code === languageCode && (
              <Editor
                debug={false}
                initData={item.value}
                onChange={handleFieldsChange('description', index)}
              />
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

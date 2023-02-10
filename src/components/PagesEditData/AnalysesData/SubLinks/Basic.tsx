import React from 'react';
import { InputLabel, List, ListItem, Typography } from '@mui/material';
import Editor from '../../../Inputs/Editor';
import StyledField from '../../../Inputs/StyledField/StyledField';
import { usePagesDataCommonStyles } from '../../PagesDataCommon/PagesDataCommon.styles';

interface IBasicProps {
  darkTheme: boolean;
  setFieldsValues: (obj: any) => void;
  fieldsValues: {
    name: {
      code: string;
      value: string;
    }[];
    code: string;
    tabs: { id: string; label: string; name: string; description: string }[];
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

  const handleTabsChange = (key: string, index: number) => (e: any) => {
    const newArray = fieldsValues.tabs.map((item, i) => {
      if (index === i) {
        if (key === 'description') {
          return {
            ...item,
            [key]: e.editor.getData(),
          };
        } else {
          return {
            ...item,
            [key]: (e.target as HTMLInputElement).value,
          };
        }
      } else {
        return item;
      }
    });
    setFieldsValues((prevState: typeof fieldsValues) => {
      return {
        ...prevState,
        tabs: [...newArray],
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
      {fieldsValues.name.map((name, index) => {
        return (
          <React.Fragment key={index}>
            {name.code === languageCode && (
              <InputLabel
                htmlFor="name"
                className={cx(classes.label, darkTheme ? 'dark' : null)}
              >
                <div>
                  Назва<span style={{ color: 'red', fontSize: '20px' }}>*</span>
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
      {fieldsValues.tabs.map((tab, index) => {
        return (
          <React.Fragment key={index}>
            <InputLabel
              htmlFor={tab.id}
              className={cx(
                classes.label,
                darkTheme ? 'dark' : null,
                index === 0 ? null : 'topMargin'
              )}
            >
              {tab.label}
              <StyledField
                id={tab.id}
                variant="outlined"
                sx={{ width: '100%', mt: '16px' }}
                darkTheme={darkTheme}
                value={tab.name}
                onChange={handleTabsChange('name', index)}
              />
            </InputLabel>
            <Editor
              debug={false}
              initData={tab.description}
              onChange={handleTabsChange('description', index)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};
